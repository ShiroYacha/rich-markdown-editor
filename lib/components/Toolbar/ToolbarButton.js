"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _styledComponents2.default.button.withConfig({
  displayName: "ToolbarButton",
  componentId: "sc-1e55xul-0"
})(["display:inline-block;flex:0;width:24px;height:24px;cursor:pointer;margin-left:10px;border:none;background:none;transition:opacity 100ms ease-in-out;padding:0;opacity:0.7;&:first-child{margin-left:0;}&:hover{opacity:1;}", ";"], function (_ref) {
  var active = _ref.active;
  return active && "opacity: 1;";
});