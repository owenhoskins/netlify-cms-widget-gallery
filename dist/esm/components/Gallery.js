"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx jsx */
const photoPropType = _propTypes.default.shape({
  src: _propTypes.default.string.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  alt: _propTypes.default.string,
  title: _propTypes.default.string,
  srcSet: _propTypes.default.array,
  sizes: _propTypes.default.array
});

var _ref2 = process.env.NODE_ENV === "production" ? {
  name: "19l6l22-Gallery",
  styles: "text-align:center;label:Gallery;"
} : {
  name: "19l6l22-Gallery",
  styles: "text-align:center;label:Gallery;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0RRIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0dhbGxlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtqc3h9IGZyb20gJ0BlbW90aW9uL2NvcmUnXG5cbmltcG9ydCB7IGNvbXB1dGVTaXplcyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGhvdG9Qcm9wVHlwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHNyYzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgYWx0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc3JjU2V0OiBQcm9wVHlwZXMuYXJyYXksXG4gIHNpemVzOiBQcm9wVHlwZXMuYXJyYXksXG59KVxuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29udGFpbmVyV2lkdGg6IDAsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpIH0pO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUsIGZhbHNlKTtcbiAgfVxuICBoYW5kbGVSZXNpemUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKSB9KTtcbiAgfVxuICBoYW5kbGVDbGljayhldmVudCwgeyBpbmRleCB9KSB7XG4gICAgY29uc3QgeyBwaG90b3MsIG9uQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG4gICAgLy9jb25zb2xlLmxvZygnR2FsbGVyeSBoYW5kbGVDbGljazogJywgcGhvdG9zW2luZGV4XS5pbWFnZUluZGV4LClcbiAgICBvbkNsaWNrKGV2ZW50LCB7XG4gICAgICBpbmRleDogcGhvdG9zW2luZGV4XS5pbWFnZUluZGV4LCAvLyB1c2UgdGhlIHNhdmVkIGluZGV4IHdoZW4gd2UgYnVpbHQgdGhlIGFycmF5XG4gICAgICAvL2luZGV4LFxuICAgICAgcGhvdG86IHBob3Rvc1tpbmRleF0sXG4gICAgICBwcmV2aW91czogcGhvdG9zW2luZGV4IC0gMV0gfHwgbnVsbCxcbiAgICAgIG5leHQ6IHBob3Rvc1tpbmRleCArIDFdIHx8IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBJbWFnZUNvbXBvbmVudCB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBzdWJ0cmFjdCAxIHBpeGVsIGJlY2F1c2UgdGhlIGJyb3dzZXIgbWF5IHJvdW5kIHVwIGEgcGl4ZWxcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAxO1xuICAgIGNvbnN0IHsgcGhvdG9zLCBjb2x1bW5zLCBtYXJnaW4sIG9uQ2xpY2ssIGJhbGFuY2VkLCByYXRpb3MgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdGh1bWJzID0gY29tcHV0ZVNpemVzKHsgd2lkdGgsIGNvbHVtbnMsIG1hcmdpbiwgcGhvdG9zLCBiYWxhbmNlZCwgcmF0aW9zIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlYWN0LXBob3RvLWdhbGxlcnktLWdhbGxlcnlcIlxuICAgICAgICBjc3M9e3tcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgIC8vZm9udFNpemU6IDBcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e2MgPT4gKHRoaXMuX2dhbGxlcnkgPSBjKX0+XG4gICAgICAgICAge3RodW1icy5tYXAoKHBob3RvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBwaG90bztcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxJbWFnZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgIGtleT17cGhvdG8ua2V5IHx8IHBob3RvLnNyY31cbiAgICAgICAgICAgICAgICBtYXJnaW49e21hcmdpbn1cbiAgICAgICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgICAgcGhvdG89e3Bob3RvfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2sgPyB0aGlzLmhhbmRsZUNsaWNrIDogbnVsbH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGNvbnRlbnQ6ICcnLCBkaXNwbGF5OiAndGFibGUnLCBjbGVhcjogJ2JvdGgnIH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuICBwaG90b3M6IFByb3BUeXBlcy5hcnJheU9mKHBob3RvUHJvcFR5cGUpLmlzUmVxdWlyZWQsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICBjb2x1bW5zOiBQcm9wVHlwZXMubnVtYmVyLFxuICBtYXJnaW46IFByb3BUeXBlcy5udW1iZXIsXG4gIEltYWdlQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkdhbGxlcnkuZGVmYXVsdFByb3BzID0ge1xuICBjb2x1bW5zOiAzLFxuICBtYXJnaW46IDIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIl19 */"
};

class Gallery extends _react.default.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      containerWidth: Math.floor(this._gallery.clientWidth)
    });
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({
        containerWidth: Math.floor(this._gallery.clientWidth)
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize(e) {
    this.setState({
      containerWidth: Math.floor(this._gallery.clientWidth)
    });
  }

  handleClick(event, _ref) {
    let index = _ref.index;
    const _this$props = this.props,
          photos = _this$props.photos,
          onClick = _this$props.onClick; //console.log('Gallery handleClick: ', photos[index].imageIndex,)

    onClick(event, {
      index: photos[index].imageIndex,
      // use the saved index when we built the array
      //index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null
    });
  }

  render() {
    const ImageComponent = this.props.ImageComponent; // subtract 1 pixel because the browser may round up a pixel

    const width = this.state.containerWidth - 1;
    const _this$props2 = this.props,
          photos = _this$props2.photos,
          columns = _this$props2.columns,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick,
          balanced = _this$props2.balanced,
          ratios = _this$props2.ratios;
    const thumbs = (0, _utils.computeSizes)({
      width,
      columns,
      margin,
      photos,
      balanced,
      ratios
    });
    return (0, _core.jsx)("div", {
      className: "react-photo-gallery--gallery",
      css: _ref2
    }, (0, _core.jsx)("div", {
      ref: c => this._gallery = c
    }, thumbs.map((photo, index) => {
      const width = photo.width,
            height = photo.height;
      return (0, _core.jsx)(ImageComponent, {
        key: photo.key || photo.src,
        margin: margin,
        index: index,
        photo: photo,
        onClick: onClick ? this.handleClick : null
      });
    })), (0, _core.jsx)("div", {
      style: {
        content: '',
        display: 'table',
        clear: 'both'
      }
    }));
  }

}

Gallery.propTypes = {
  photos: _propTypes.default.arrayOf(photoPropType).isRequired,
  onClick: _propTypes.default.func,
  columns: _propTypes.default.number,
  margin: _propTypes.default.number,
  ImageComponent: _propTypes.default.func
};
Gallery.defaultProps = {
  columns: 3,
  margin: 2
};
var _default = Gallery;
exports.default = _default;
//# sourceMappingURL=Gallery.js.map