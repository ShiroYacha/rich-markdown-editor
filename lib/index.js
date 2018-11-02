"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Placeholder = exports.schema = exports.theme = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _slate = require("slate");

var _slateReact = require("slate-react");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require("./theme");

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _getDataTransferFiles = require("./lib/getDataTransferFiles");

var _getDataTransferFiles2 = _interopRequireDefault(_getDataTransferFiles);

var _isModKey = require("./lib/isModKey");

var _isModKey2 = _interopRequireDefault(_isModKey);

var _Flex = require("./components/Flex");

var _Flex2 = _interopRequireDefault(_Flex);

var _Toolbar = require("./components/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _BlockInsert = require("./components/BlockInsert");

var _BlockInsert2 = _interopRequireDefault(_BlockInsert);

var _Placeholder = require("./components/Placeholder");

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _Contents = require("./components/Contents");

var _Contents2 = _interopRequireDefault(_Contents);

var _serializer = require("./serializer");

var _serializer2 = _interopRequireDefault(_serializer);

var _plugins = require("./plugins");

var _plugins2 = _interopRequireDefault(_plugins);

var _changes = require("./changes");

var _marks = require("./marks");

var _marks2 = _interopRequireDefault(_marks);

var _nodes = require("./nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var theme = exports.theme = _theme.light;
var schema = exports.schema = _schema2.default;
var Placeholder = exports.Placeholder = _Placeholder2.default;

var RichMarkdownEditor = (_temp = _class = function (_React$PureComponent) {
  _inherits(RichMarkdownEditor, _React$PureComponent);

  function RichMarkdownEditor(props) {
    _classCallCheck(this, RichMarkdownEditor);

    var _this = _possibleConstructorReturn(this, (RichMarkdownEditor.__proto__ || Object.getPrototypeOf(RichMarkdownEditor)).call(this, props));

    _initialiseProps.call(_this);

    _this.blockToolbarPlugins = _this.props.blockToolbarPlugins;
    _this.serializer = props.serializer ? props.serializer : _serializer2.default;

    _this.plugins = (0, _plugins2.default)();
    if (props.plugins) {
      if (Array.isArray(props.plugins)) {
        _this.plugins = props.plugins.concat(_this.plugins);
      } else {
        console.warn("Editor.plugins prop must be an array of Slate plugins");
      }
    }
    _this.state = {
      editorLoaded: false,
      editorValue: _this.serializer.deserialize(props.defaultValue)
    };
    return _this;
  }

  _createClass(RichMarkdownEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.readOnly) return;
      window.addEventListener("keydown", this.handleKeyDown);

      if (this.props.autoFocus) {
        this.focusAtEnd();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.schema !== this.props.schema || nextProps.valueOverride !== undefined && nextProps.valueOverride !== this.props.valueOverride) {
        this.setState({
          schema: _extends({}, _schema2.default, nextProps.schema),
          editorValue: _serializer2.default.deserialize(nextProps.valueOverride)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.readOnly && !this.props.readOnly && this.props.autoFocus) {
        this.focusAtEnd();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("keydown", this.handleKeyDown);
    }
  }, {
    key: "onSave",
    value: function onSave(ev) {
      var onSave = this.props.onSave;

      if (onSave) {
        ev.preventDefault();
        ev.stopPropagation();
        onSave({ done: false });
      }
    }
  }, {
    key: "onSaveAndExit",
    value: function onSaveAndExit(ev) {
      var onSave = this.props.onSave;

      if (onSave) {
        ev.preventDefault();
        ev.stopPropagation();
        onSave({ done: true });
      }
    }
  }, {
    key: "onCancel",
    value: function onCancel(ev) {
      var onCancel = this.props.onCancel;

      if (onCancel) {
        ev.preventDefault();
        ev.stopPropagation();
        onCancel();
      }
    }
  }]);

  return RichMarkdownEditor;
}(React.PureComponent), _class.defaultProps = {
  defaultValue: "",
  placeholder: "Write something nice…",
  onImageUploadStart: function onImageUploadStart() {},
  onImageUploadStop: function onImageUploadStop() {}
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.prevSchema = null;
  this.schema = null;

  this.setEditorRef = function (ref) {
    _this2.editor = ref;
    // Force re-render to show ToC (<Content />)
    _this2.setState({ editorLoaded: true });
  };

  this.value = function () {
    return _this2.serializer.serialize(_this2.state.editorValue);
  };

  this.handleChange = function (change) {
    if (_this2.state.editorValue !== change.value) {
      _this2.setState({ editorValue: change.value }, function (state) {
        if (_this2.props.onChange && !_this2.props.readOnly) {
          _this2.props.onChange(_this2.value);
        }
      });
    }
  };

  this.handleDrop = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ev) {
      var files, i, _file;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this2.props.readOnly) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (_this2.editor.props.uploadImage) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              if (!ev.isDefaultPrevented()) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:

              // otherwise we'll handle this
              ev.preventDefault();
              ev.stopPropagation();

              files = (0, _getDataTransferFiles2.default)(ev);
              i = 0;

            case 10:
              if (!(i < files.length)) {
                _context.next = 18;
                break;
              }

              _file = files[i];

              if (!_file.type.startsWith("image/")) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return _this2.insertImageFile(_file);

            case 15:
              i++;
              _context.next = 10;
              break;

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.insertImageFile = function (file) {
    _this2.editor.change(function (change) {
      return change.call(_changes.insertImageFile, file, _this2.editor);
    });
  };

  this.cancelEvent = function (ev) {
    ev.preventDefault();
  };

  this.handleKeyDown = function (ev) {
    if (_this2.props.readOnly) return;

    switch (ev.key) {
      case "s":
        if ((0, _isModKey2.default)(ev)) _this2.onSave(ev);
        return;
      case "Enter":
        if ((0, _isModKey2.default)(ev)) _this2.onSaveAndExit(ev);
        return;
      case "Escape":
        if ((0, _isModKey2.default)(ev)) _this2.onCancel(ev);
        return;
      default:
    }
  };

  this.focusAtStart = function () {
    _this2.editor.change(function (change) {
      return change.collapseToStartOf(change.value.document).focus();
    });
  };

  this.focusAtEnd = function () {
    _this2.editor.change(function (change) {
      return change.collapseToEndOf(change.value.document).focus();
    });
  };

  this.renderNode = function (props) {
    var node = _this2.props.renderNode && _this2.props.renderNode(props);
    if (node) return node;
    return (0, _nodes2.default)(props, _this2.blockToolbarPlugins);
  };

  this.renderPlaceholder = function (props) {
    if (_this2.props.renderPlaceholder) {
      return _this2.props.renderPlaceholder(props);
    }
    var editor = props.editor,
        node = props.node;


    if (!editor.props.placeholder) return;
    if (editor.state.isComposing) return;
    if (node.object !== "block") return;
    if (!_slate.Text.isTextList(node.nodes)) return;
    if (node.text !== "") return;
    if (editor.value.document.getBlocks().size > 1) return;

    return React.createElement(
      Placeholder,
      null,
      editor.props.readOnly ? "" : editor.props.placeholder
    );
  };

  this.getSchema = function () {
    if (_this2.prevSchema !== _this2.props.schema) {
      _this2.schema = _extends({}, _schema2.default, _this2.props.schema || {});
      _this2.prevSchema = _this2.props.schema;
    }
    return _this2.schema;
  };

  this.render = function () {
    var _props = _this2.props,
        readOnly = _props.readOnly,
        toc = _props.toc,
        pretitle = _props.pretitle,
        placeholder = _props.placeholder,
        onSave = _props.onSave,
        uploadImage = _props.uploadImage,
        onSearchLink = _props.onSearchLink,
        onClickLink = _props.onClickLink,
        onImageUploadStart = _props.onImageUploadStart,
        onImageUploadStop = _props.onImageUploadStop,
        onShowToast = _props.onShowToast,
        className = _props.className,
        style = _props.style,
        dark = _props.dark;


    var theme = _this2.props.theme || (dark ? _theme.dark : _theme.light);

    return React.createElement(
      _Flex2.default,
      {
        style: style,
        className: className,
        onDrop: _this2.handleDrop,
        onDragOver: _this2.cancelEvent,
        onDragEnter: _this2.cancelEvent,
        align: "flex-start",
        justify: "center",
        column: true,
        auto: true
      },
      React.createElement(
        _styledComponents.ThemeProvider,
        { theme: theme },
        React.createElement(
          React.Fragment,
          null,
          toc && _this2.state.editorLoaded && _this2.editor && React.createElement(_Contents2.default, { editor: _this2.editor }),
          !readOnly && _this2.editor && React.createElement(_Toolbar2.default, { value: _this2.state.editorValue, editor: _this2.editor }),
          !readOnly && _this2.editor && React.createElement(_BlockInsert2.default, {
            editor: _this2.editor,
            onInsertImage: _this2.insertImageFile
          }),
          React.createElement(StyledEditor, {
            innerRef: _this2.setEditorRef,
            plugins: _this2.plugins,
            value: _this2.state.editorValue,
            placeholder: placeholder,
            renderPlaceholder: _this2.renderPlaceholder,
            renderNode: _this2.renderNode,
            renderMark: _marks2.default,
            schema: _this2.getSchema(),
            onKeyDown: _this2.handleKeyDown,
            onChange: _this2.handleChange,
            onSave: onSave,
            onSearchLink: onSearchLink,
            onClickLink: onClickLink,
            onImageUploadStart: onImageUploadStart,
            onImageUploadStop: onImageUploadStop,
            onShowToast: onShowToast,
            readOnly: readOnly,
            spellCheck: !readOnly,
            uploadImage: uploadImage,
            pretitle: pretitle
          })
        )
      )
    );
  };
}, _temp);


var StyledEditor = (0, _styledComponents2.default)(_slateReact.Editor).withConfig({
  displayName: "src__StyledEditor",
  componentId: "dlrrv6-0"
})(["background:", ";font-family:", ";font-weight:", ";font-size:1em;line-height:1.7em;width:100%;color:", ";h1,h2,h3,h4,h5,h6{font-weight:500;}ul,ol{margin:0 0.1em;padding-left:1em;ul,ol{margin:0.1em;}}p{position:relative;margin:0;}a{color:", ";}a:hover{text-decoration:", ";}li p{display:inline;margin:0;}.todoList{list-style:none;padding-left:0;.todoList{padding-left:1em;}}.todo{span:last-child:focus{outline:none;}}blockquote{border-left:3px solid ", ";margin:0;padding-left:10px;font-style:italic;}table{border-collapse:collapse;}tr{border-bottom:1px solid #eee;}th{font-weight:bold;}th,td{padding:5px 20px 5px 0;}b,strong{font-weight:600;}"], function (props) {
  return props.theme.background;
}, function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.fontWeight;
}, function (props) {
  return props.theme.text;
}, function (props) {
  return props.theme.link;
}, function (props) {
  return props.readOnly ? "underline" : "none";
}, function (props) {
  return props.theme.quote;
});

exports.default = RichMarkdownEditor;