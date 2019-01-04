"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map2 = require("lodash/map");

var _map3 = _interopRequireDefault(_map2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = CodeBlock;

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _CopyButton = require("./CopyButton");

var _CopyButton2 = _interopRequireDefault(_CopyButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCopyText(node) {
  return node.nodes.reduce(function (memo, line) {
    return "" + memo + line.text + "\n";
  }, "");
}

var languages = {
  css: "CSS",
  clike: "C",
  csharp: "C#",
  markup: "HTML",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  typescript: "TypeScript"
};

function CodeBlock(_ref) {
  var children = _ref.children,
      node = _ref.node,
      readOnly = _ref.readOnly,
      attributes = _ref.attributes,
      editor = _ref.editor;
  var data = node.data;

  var language = data.get("language") || "javascript";

  var onSelectLanguage = function onSelectLanguage(ev) {
    editor.change(function (change) {
      return change.setNodeByKey(node.key, {
        data: _extends({}, data, { language: ev.target.value })
      });
    });
  };

  return React.createElement(
    Container,
    _extends({}, attributes, { spellCheck: false }),
    readOnly && React.createElement(_CopyButton2.default, { text: getCopyText(node) }),
    React.createElement(
      Code,
      null,
      children
    ),
    !readOnly && React.createElement(
      Language,
      {
        onChange: onSelectLanguage,
        value: language,
        contentEditable: false
      },
      (0, _map3.default)(languages, function (name, value) {
        return React.createElement(
          "option",
          { key: value, value: value },
          name
        );
      })
    )
  );
}

/*
  Based on Prism template by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/prism/)
  Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)
*/
var Code = _styledComponents2.default.code.withConfig({
  displayName: "Code",
  componentId: "sc-1qm17ch-0"
})(["display:block;overflow-x:auto;padding:0.5em 1em;line-height:1.4em;pre{-webkit-font-smoothing:initial;font-family:", " font-size:13px;direction:ltr;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;color:", ";margin:0;overflow:auto;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:", ";}.token.punctuation{color:", ";}.token.namespace{opacity:.7;}.token.operator,.token.boolean,.token.number{color:", ";}.token.property{color:", ";}.token.tag{color:", ";}.token.string{color:", ";}.token.selector{color:", ";}.token.attr-name{color:", ";}.token.entity,.token.url,.language-css .token.string,.style .token.string{color:", ";}.token.attr-value,.token.keyword,.token.control,.token.directive,.token.unit{color:", ";}.token.function{color:", ";}.token.statement,.token.regex,.token.atrule{color:", ";}.token.placeholder,.token.variable{color:", ";}.token.deleted{text-decoration:line-through;}.token.inserted{border-bottom:1px dotted ", ";text-decoration:none;}.token.italic{font-style:italic;}.token.important,.token.bold{font-weight:bold;}.token.important{color:", ";}.token.entity{cursor:help;}"], function (props) {
  return props.theme.fontFamilyMono;
}, function (props) {
  return props.theme.code;
}, function (props) {
  return props.theme.codeComment;
}, function (props) {
  return props.theme.codePunctuation;
}, function (props) {
  return props.theme.codeNumber;
}, function (props) {
  return props.theme.codeProperty;
}, function (props) {
  return props.theme.codeTag;
}, function (props) {
  return props.theme.codeString;
}, function (props) {
  return props.theme.codeSelector;
}, function (props) {
  return props.theme.codeAttr;
}, function (props) {
  return props.theme.codeEntity;
}, function (props) {
  return props.theme.codeKeyword;
}, function (props) {
  return props.theme.codeFunction;
}, function (props) {
  return props.theme.codeStatement;
}, function (props) {
  return props.theme.codePlaceholder;
}, function (props) {
  return props.theme.codeInserted;
}, function (props) {
  return props.theme.codeImportant;
});

var Language = _styledComponents2.default.select.withConfig({
  displayName: "Code__Language",
  componentId: "sc-1qm17ch-1"
})(["position:absolute;bottom:2px;right:2px;opacity:0;"]);

var Container = _styledComponents2.default.div.withConfig({
  displayName: "Code__Container",
  componentId: "sc-1qm17ch-2"
})(["position:relative;background:", ";border-radius:4px;border:1px solid ", ";&:hover{> span{opacity:1;}", "{opacity:1;}}"], function (props) {
  return props.theme.codeBackground;
}, function (props) {
  return props.theme.codeBorder;
}, Language);