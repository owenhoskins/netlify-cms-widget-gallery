"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileLink = (
/*#__PURE__*/
0, _styledBase.default)((_ref) => {
  let value = _ref.value,
      getAsset = _ref.getAsset;
  return _react.default.createElement("a", {
    href: getAsset(value),
    rel: "noopener noreferrer",
    target: "_blank"
  }, value);
}, {
  target: "eob0mpf0",
  label: "FileLink"
})(process.env.NODE_ENV === "production" ? {
  name: "13o7eu2",
  styles: "display:block;"
} : {
  name: "13o7eu2",
  styles: "display:block;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ZpbGVQcmV2aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVFIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ZpbGVQcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCB7IFdpZGdldFByZXZpZXdDb250YWluZXIgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuY29uc3QgRmlsZUxpbmsgPSBzdHlsZWQoKHsgdmFsdWUsIGdldEFzc2V0IH0pID0+IChcbiAgPGEgaHJlZj17Z2V0QXNzZXQodmFsdWUpfSByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAge3ZhbHVlfVxuICA8L2E+XG4pKWBcbiAgZGlzcGxheTogYmxvY2s7XG5gO1xuXG5mdW5jdGlvbiBGaWxlTGlua0xpc3QoeyB2YWx1ZXMsIGdldEFzc2V0IH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAge3ZhbHVlcy5tYXAodmFsdWUgPT4gKFxuICAgICAgICA8RmlsZUxpbmsga2V5PXt2YWx1ZX0gdmFsdWU9e3ZhbHVlfSBnZXRBc3NldD17Z2V0QXNzZXR9IC8+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRmlsZUNvbnRlbnQoeyB2YWx1ZSwgZ2V0QXNzZXQgfSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgTGlzdC5pc0xpc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIDxGaWxlTGlua0xpc3QgdmFsdWVzPXt2YWx1ZX0gZ2V0QXNzZXQ9e2dldEFzc2V0fSAvPjtcbiAgfVxuICByZXR1cm4gPEZpbGVMaW5rIHZhbHVlPXt2YWx1ZX0gZ2V0QXNzZXQ9e2dldEFzc2V0fSAvPjtcbn1cblxuY29uc3QgRmlsZVByZXZpZXcgPSBwcm9wcyA9PiAoXG4gIDxXaWRnZXRQcmV2aWV3Q29udGFpbmVyPntwcm9wcy52YWx1ZSA/IDxGaWxlQ29udGVudCB7Li4ucHJvcHN9IC8+IDogbnVsbH08L1dpZGdldFByZXZpZXdDb250YWluZXI+XG4pO1xuXG5GaWxlUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB2YWx1ZTogUHJvcFR5cGVzLm5vZGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGaWxlUHJldmlldztcbiJdfQ== */"
});

function FileLinkList(_ref2) {
  let values = _ref2.values,
      getAsset = _ref2.getAsset;
  return _react.default.createElement("div", null, values.map(value => _react.default.createElement(FileLink, {
    key: value,
    value: value,
    getAsset: getAsset
  })));
}

function FileContent(_ref3) {
  let value = _ref3.value,
      getAsset = _ref3.getAsset;

  if (Array.isArray(value) || _immutable.List.isList(value)) {
    return _react.default.createElement(FileLinkList, {
      values: value,
      getAsset: getAsset
    });
  }

  return _react.default.createElement(FileLink, {
    value: value,
    getAsset: getAsset
  });
}

const FilePreview = props => _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, props.value ? _react.default.createElement(FileContent, props) : null);

FilePreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.node
};
var _default = FilePreview;
exports.default = _default;
//# sourceMappingURL=FilePreview.js.map