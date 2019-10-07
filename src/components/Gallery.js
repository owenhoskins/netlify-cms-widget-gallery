/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {jsx} from '@emotion/core'

import { computeSizes } from '../utils';

const photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.array,
  sizes: PropTypes.array,
})

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    window.addEventListener('resize', this.handleResize);
  }
  componentDidUpdate() {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  handleResize(e) {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
  }
  handleClick(event, { index }) {
    const { photos, onClick } = this.props;
    //console.log('Gallery handleClick: ', photos[index].imageIndex,)
    onClick(event, {
      index: photos[index].imageIndex, // use the saved index when we built the array
      //index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  }

  render() {
    const { ImageComponent } = this.props;
    // subtract 1 pixel because the browser may round up a pixel
    const width = this.state.containerWidth - 1;
    const { photos, columns, margin, onClick, balanced, ratios } = this.props;
    const thumbs = computeSizes({ width, columns, margin, photos, balanced, ratios });
    return (
      <div
        className="react-photo-gallery--gallery"
        css={{
          textAlign: 'center',
          //fontSize: 0
        }}
      >
        <div ref={c => (this._gallery = c)}>
          {thumbs.map((photo, index) => {
            const { width, height } = photo;
            return (
              <ImageComponent
                key={photo.key || photo.src}
                margin={margin}
                index={index}
                photo={photo}
                onClick={onClick ? this.handleClick : null}
              />
            );
          })}
        </div>
        <div style={{ content: '', display: 'table', clear: 'both' }} />
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  ImageComponent: PropTypes.func,
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2,
};

export default Gallery;
