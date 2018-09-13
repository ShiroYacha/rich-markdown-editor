"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _styledComponents2.default.span.attrs({
  contentEditable: false
}).withConfig({
  displayName: "Placeholder",
  componentId: "zq3any-0"
})(["display:inline-block;width:0;white-space:nowrap;float:left;pointer-events:none;user-select:none;color:", ";"], function (props) {
  return props.theme.placeholder;
});