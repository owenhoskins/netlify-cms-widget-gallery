import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Gallery from './Gallery';
import Img from './Image';
import { getSizes } from '../utils';

import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

const renderImage = (props) => {
  const {
    photo: { width, height, originalSizes },
    margin,
    onClick,
  } = props
  return (
    <div
      style={{
        width,
        height,
        display: 'inline-block',
        margin,
        //cursor: 'pointer'
      }}
    >
      <Img sizes={originalSizes} />
    </div>
  )
}

const ImagePreviewContent = props => {
  const { value, getAsset } = props;
  const photos = [];
  const ratios = [];

  if (Array.isArray(value) || List.isList(value)) {
    value.forEach(val => {
      const sizes = getSizes(val, 500)
      if (sizes && sizes.aspectRatio) {
        const { aspectRatio, src, srcSet } = sizes
        const srcSetArray = srcSet.split(',')
        photos.push({
          width: aspectRatio,
          height: 1,
          src,
          srcSet: srcSetArray,
          sizes: [sizes.sizes],
          originalSizes: sizes,
        })
        ratios.push(aspectRatio)
      }
    });
  }

  return <Gallery
    margin={16}
    columns={4}
    ratios={ratios}
    balanced
    ImageComponent={renderImage}
    photos={photos}
  />
};

const GalleryPreview = props => {
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
};

GalleryPreview.propTypes = {
  getAsset: PropTypes.func.isRequired,
  value: PropTypes.node,
};

export default GalleryPreview;
