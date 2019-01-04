"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertImageFile = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var insertImageFile = exports.insertImageFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(change, file, editor) {
    var _editor$props, uploadImage, onImageUploadStart, onImageUploadStop, id, alt, placeholderSrc, node, props, src, placeholder;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _editor$props = editor.props, uploadImage = _editor$props.uploadImage, onImageUploadStart = _editor$props.onImageUploadStart, onImageUploadStop = _editor$props.onImageUploadStop;


            if (!uploadImage) {
              console.warn("uploadImage callback must be defined to handle image uploads.");
            }

            if (onImageUploadStart) onImageUploadStart();
            _context.prev = 3;

            // load the file as a data URL
            id = "rme-upload-" + ++uploadCount;
            alt = "";
            placeholderSrc = URL.createObjectURL(file);
            node = {
              type: "image",
              isVoid: true,
              data: { src: placeholderSrc, id: id, alt: alt, loading: true }
            };

            // insert / replace into document as uploading placeholder replacing
            // empty paragraphs if available.

            if (!change.value.startBlock.text && change.value.startBlock.type === "paragraph") {
              change.setBlocks(node);
            } else {
              change.insertBlock(node);
            }

            change.insertBlock("paragraph");

            props = void 0;
            _context.prev = 11;
            _context.next = 14;
            return uploadImage(file);

          case 14:
            src = _context.sent;

            if (src) {
              _context.next = 17;
              break;
            }

            throw new Error("No image url returned from uploadImage callback");

          case 17:

            props = {
              data: { src: src, alt: alt, loading: false }
            };
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](11);

            if (editor.props.onShowToast) {
              editor.props.onShowToast("Sorry, an error occurred uploading the image");
            }

          case 23:
            placeholder = editor.value.document.findDescendant(function (node) {
              return node.data && node.data.get("id") === id;
            });

            // the user may have removed the placeholder while the image was uploaded. In this
            // case we can quietly prevent updating the image.

            if (placeholder) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return");

          case 26:

            // if there was an error during upload, remove the placeholder image
            if (!props) {
              editor.change(function (change) {
                change.removeNodeByKey(placeholder.key);
              });
            } else {
              editor.change(function (change) {
                change.setNodeByKey(placeholder.key, props);
              });
            }
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](3);
            throw _context.t1;

          case 32:
            _context.prev = 32;

            if (onImageUploadStop) onImageUploadStop();
            return _context.finish(32);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 29, 32, 35], [11, 20]]);
  }));

  return function insertImageFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.splitAndInsertBlock = splitAndInsertBlock;

var _slate = require("slate");

var _slateReact = require("slate-react");

var _EditList = require("./plugins/EditList");

var _EditList2 = _interopRequireDefault(_EditList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var changes = _EditList2.default.changes;

var uploadCount = 0;

function splitAndInsertBlock(change, options) {
  var type = options.type,
      wrapper = options.wrapper;

  var parent = change.value.document.getParent(change.value.startBlock.key);

  // lists get some special treatment
  if (parent && parent.type === "list-item") {
    change.collapseToStart().call(changes.splitListItem).collapseToEndOfPreviousBlock().call(changes.unwrapList);
  }

  if (wrapper) change.collapseToStartOfNextBlock();

  // this is a hack as insertBlock with normalize: false does not appear to work
  change.insertBlock("paragraph").setBlocks(type, { normalize: false });

  if (wrapper) change.wrapBlock(wrapper);
  return change;
}