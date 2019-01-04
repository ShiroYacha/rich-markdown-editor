"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Embeds;

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _slate = require("slate");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function findTopParent(document, node) {
  var parent = void 0;
  while (node !== document) {
    parent = document.getParent(node.key);
    if (parent === document) return node;
    node = parent;
  }
}

function Embeds(_ref) {
  var getComponent = _ref.getComponent;

  return {
    validateNode: function validateNode(node) {
      if (!getComponent) return;
      if (node.object !== "inline") return;
      if (node.type !== "link") return;
      if (node.text !== node.data.get("href")) return;

      var component = getComponent(node);
      if (!component) return;

      return function (change) {
        var document = change.value.document;
        var parent = findTopParent(document, node);
        if (!parent) return;

        var firstText = parent.getFirstText();
        var range = _slate.Range.create({
          anchorKey: firstText.key,
          anchorOffset: parent.text.length,
          focusKey: firstText.key,
          focusOffset: parent.text.length
        });

        return change.withoutNormalization(function (c) {
          c.removeNodeByKey(node.key).insertBlockAtRange(range, {
            object: "block",
            type: "link",
            isVoid: true,
            nodes: [{
              object: "text",
              leaves: [{ text: "" }]
            }],
            data: _extends({}, node.data.toJS(), { embed: true, component: component })
          });

          // Remove entire paragraph if link is the only item
          if (parent.type === "paragraph" && parent.text === node.text) {
            c.removeNodeByKey(parent.key);
          }

          return change;
        });
      };
    }
  };
}