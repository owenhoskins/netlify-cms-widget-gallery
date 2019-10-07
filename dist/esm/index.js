"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GalleryPreview", {
  enumerable: true,
  get: function get() {
    return _GalleryPreview2.default;
  }
});
exports.GalleryControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _withFileControl = _interopRequireDefault(require("./components/withFileControl"));

var _GalleryPreview2 = _interopRequireDefault(require("./components/GalleryPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GalleryControl = (0, _withFileControl.default)({
  forImage: true
});
exports.GalleryControl = GalleryControl;
//# sourceMappingURL=index.js.map