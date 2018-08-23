"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineCode = _styledComponents2.default.code.attrs({
  spellCheck: false
}).withConfig({
  displayName: "InlineCode"
})(["padding:0.15em;background:", ";border-radius:4px;border:1px solid ", ";"], function (props) {
  return props.theme.codeBackground;
}, function (props) {
  return props.theme.codeBorder;
});
exports.default = InlineCode;