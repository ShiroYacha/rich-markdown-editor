"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoList = _styledComponents2.default.ul.withConfig({
  displayName: "TodoList"
})(["list-style:none;padding:0 !important;ul{padding-left:1em;}"]);
exports.default = TodoList;