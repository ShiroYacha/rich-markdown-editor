"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HorizontalRule(props) {
  var editor = props.editor,
      node = props.node,
      attributes = props.attributes;

  var active = editor.value.isFocused && editor.value.selection.hasEdgeIn(node);
  return _react2.default.createElement(StyledHr, _extends({ active: active }, attributes));
}

var StyledHr = _styledComponents2.default.hr.withConfig({
  displayName: "HorizontalRule__StyledHr"
})(["padding-top:0.75em;margin:0;border:0;border-bottom:1px solid ", ";"], function (props) {
  return props.active ? props.theme.selected : props.theme.horizontalRule;
});

exports.default = HorizontalRule;