// @flow
import * as React from "react";
import { findDOMNode } from "react-dom";
import keydown from "react-keydown";
import styled, { withTheme } from "styled-components";
import {
  Heading1Icon,
  Heading2Icon,
  BlockQuoteIcon,
  ImageIcon,
  CodeIcon,
  BulletedListIcon,
  OrderedListIcon,
  HorizontalRuleIcon,
  TodoListIcon,
  TableIcon,
} from "outline-icons";
import getDataTransferFiles from "../../lib/getDataTransferFiles";
import Flex from "../Flex";
import type { SlateNodeProps } from "../../types";

import { fadeIn } from "../../animations";
import { splitAndInsertBlock, insertImageFile } from "../../changes";
import ToolbarButton from "./ToolbarButton";

import { Block } from 'slate'
import { editTable } from "../../plugins"

type Props = SlateNodeProps & {
  theme: Object,
};

type Options = {
  type: string | Object,
  wrapper?: string | Object,
};

class BlockToolbar extends React.Component<Props> {
  bar: HTMLDivElement;
  file: HTMLInputElement;

  componentDidMount() {
    window.addEventListener("click", this.handleOutsideMouseClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleOutsideMouseClick);
  }

  handleOutsideMouseClick = (ev: SyntheticMouseEvent<*>) => {
    const element = findDOMNode(this.bar);

    if (
      !element ||
      (ev.target instanceof Node && element.contains(ev.target)) ||
      (ev.button && ev.button !== 0)
    ) {
      return;
    }
    this.removeSelf(ev);
  };

  @keydown("esc")
  removeSelf(ev: SyntheticEvent<*>) {
    ev.preventDefault();
    ev.stopPropagation();

    this.props.editor.change(change =>
      change.setNodeByKey(this.props.node.key, {
        type: "paragraph",
        text: "",
        isVoid: false,
      })
    );
  }

  insertBlock = (
    options: Options,
    cursorPosition: "before" | "on" | "after" = "on"
  ) => {
    const { editor } = this.props;

    editor.change(change => {
      change
        .collapseToEndOf(this.props.node)
        .call(splitAndInsertBlock, options)
        .removeNodeByKey(this.props.node.key)
        .collapseToEnd();

      if (cursorPosition === "before") change.collapseToStartOfPreviousBlock();
      if (cursorPosition === "after") change.collapseToStartOfNextBlock();
      return change.focus();
    });
  };

  insertTable = () => {
    const { editor } = this.props;

    const rawTableJson = editTable.utils.createTable(2, 2).toJSON();

    // hack: make the first row nodes "table-head"
    rawTableJson.nodes[0].nodes.forEach(tableCell => {
      tableCell.type = "table-head";
      tableCell.nodes = [];
    });
    const table = Block.fromJSON(rawTableJson);

    editor.change(change => {
        change
          .collapseToEndOf(this.props.node)
          .insertBlock(table)
          .removeNodeByKey(this.props.node.key)
          .collapseToEnd();

        return change.focus();
    });
  }

  handleClickBlock = (ev: SyntheticEvent<*>, type: string) => {
    ev.preventDefault();

    switch (type) {
      case "heading1":
      case "heading2":
      case "block-quote":
      case "code":
        return this.insertBlock({ type });
      case "horizontal-rule":
        return this.insertBlock(
          {
            type: { type: "horizontal-rule", isVoid: true },
          },
          "after"
        );
      case "bulleted-list":
        return this.insertBlock({
          type: "list-item",
          wrapper: "bulleted-list",
        });
      case "ordered-list":
        return this.insertBlock({
          type: "list-item",
          wrapper: "ordered-list",
        });
      case "todo-list":
        return this.insertBlock({
          type: { type: "list-item", data: { checked: false } },
          wrapper: "todo-list",
        });
      case "image":
        return this.onPickImage();
      case "table":
        return this.insertTable()
      default:
    }
  };

  onPickImage = () => {
    // simulate a click on the file upload input element
    this.file.click();
  };

  onImagePicked = async (ev: SyntheticInputEvent<*>) => {
    const files = getDataTransferFiles(ev);
    const { editor } = this.props;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      editor.change(change => change.call(insertImageFile, file, editor));
    }
  };

  renderBlockButton = (type: string, IconClass: Function) => {
    return (
      <ToolbarButton onMouseDown={ev => this.handleClickBlock(ev, type)}>
        <IconClass color={this.props.theme.blockToolbarItem} />
      </ToolbarButton>
    );
  };

  render() {
    const { editor, attributes, node } = this.props;
    const hasImageUpload = !!editor.props.uploadImage;

    const active =
      editor.value.isFocused && editor.value.selection.hasEdgeIn(node);

    return (
      <Bar active={active} {...attributes} ref={ref => (this.bar = ref)}>
        <HiddenInput
          type="file"
          innerRef={ref => (this.file = ref)}
          onChange={this.onImagePicked}
          accept="image/*"
        />
        {this.renderBlockButton("heading1", Heading1Icon)}
        {this.renderBlockButton("heading2", Heading2Icon)}
        <Separator />
        {this.renderBlockButton("bulleted-list", BulletedListIcon)}
        {this.renderBlockButton("ordered-list", OrderedListIcon)}
        {this.renderBlockButton("todo-list", TodoListIcon)}
        <Separator />
        {this.renderBlockButton("block-quote", BlockQuoteIcon)}
        {this.renderBlockButton("code", CodeIcon)}
        {this.renderBlockButton("horizontal-rule", HorizontalRuleIcon)}
        {hasImageUpload && this.renderBlockButton("image", ImageIcon)}
        {this.renderBlockButton("table", TableIcon)}
      </Bar>
    );
  }
}

const Separator = styled.div`
  height: 100%;
  width: 1px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin-left: 10px;
`;

const Bar = styled(Flex)`
  z-index: 100;
  animation: ${fadeIn} 150ms ease-in-out;
  position: relative;
  align-items: center;
  background: ${props => props.theme.blockToolbarBackground};
  height: 44px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: -100%;
    width: 100%;
    height: 44px;
    background: ${props => props.theme.blockToolbarBackground};
  }

  &:after {
    left: auto;
    right: -100%;
  }

  @media print {
    display: none;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  top: -100px;
  left: -100px;
  visibility: hidden;
`;

export default withTheme(BlockToolbar);
