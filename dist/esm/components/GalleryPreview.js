"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _Gallery = _interopRequireDefault(require("./Gallery"));

var _Image = _interopRequireDefault(require("./Image"));

var _utils = require("../utils");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderImage = props => {
  const _props$photo = props.photo,
        width = _props$photo.width,
        height = _props$photo.height,
        originalSizes = _props$photo.originalSizes,
        margin = props.margin,
        onClick = props.onClick;
  return _react.default.createElement("div", {
    style: {
      width,
      height,
      display: 'inline-block',
      margin //cursor: 'pointer'

    }
  }, _react.default.createElement(_Image.default, {
    sizes: originalSizes
  }));
};

const ImagePreviewContent = props => {
  const value = props.value,
        getAsset = props.getAsset;
  const photos = [];
  const ratios = [];

  if (Array.isArray(value) || _immutable.List.isList(value)) {
    value.forEach(val => {
      const sizes = (0, _utils.getSizes)(val, 500);

      if (sizes && sizes.aspectRatio) {
        const aspectRatio = sizes.aspectRatio,
              src = sizes.src,
              srcSet = sizes.srcSet;
        const srcSetArray = srcSet.split(',');
        photos.push({
          width: aspectRatio,
          height: 1,
          src,
          srcSet: srcSetArray,
          sizes: [sizes.sizes],
          originalSizes: sizes
        });
        ratios.push(aspectRatio);
      }
    });
  }

  return _react.default.createElement(_Gallery.default, {
    margin: 16,
    columns: 4,
    ratios: ratios,
    balanced: true,
    ImageComponent: renderImage,
    photos: photos
  });
};

const GalleryPreview = props => {
  return _react.default.createElement(_netlifyCmsUiDefault.WidgetPreviewContainer, null, props.value ? _react.default.createElement(ImagePreviewContent, props) : null);
};

GalleryPreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.node
};
var _default = GalleryPreview;
exports.default = _default;
//# sourceMappingURL=GalleryPreview.js.map