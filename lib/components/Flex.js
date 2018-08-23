"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Flex = function Flex(props) {
  var children = props.children,
      restProps = _objectWithoutProperties(props, ["children"]);

  return React.createElement(
    Container,
    restProps,
    children
  );
};

var Container = _styledComponents2.default.div.withConfig({
  displayName: "Flex__Container"
})(["display:flex;flex:", ";flex-direction:", ";align-items:", ";justify-content:", ";"], function (_ref) {
  var auto = _ref.auto;
  return auto ? "1 1 auto" : "initial";
}, function (_ref2) {
  var column = _ref2.column;
  return column ? "column" : "row";
}, function (_ref3) {
  var align = _ref3.align;
  return align;
}, function (_ref4) {
  var justify = _ref4.justify;
  return justify;
});

exports.default = Flex;