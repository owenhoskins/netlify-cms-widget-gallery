import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { Map, List } from 'immutable';
import { once } from 'lodash';
import uuid from 'uuid/v4';
import { oneLine } from 'common-tags';
import { lengths, components, buttons } from 'netlify-cms-ui-default';

import { transformUrl } from '../utils'

const MAX_DISPLAY_LENGTH = 50;

const ImageWrapper = styled.div`
  flex-basis: 155px;
  width: 155px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${lengths.borderRadius};
`;

const MultiImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FileInfo = styled.div`
  button:not(:first-child) {
    margin-top: 12px;
  }
`;

const FileLink = styled.a`
  margin-bottom: 20px;
  font-weight: normal;
  color: inherit;

  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

const FileLinkList = styled.ul`
  list-style-type: none;
`;

const FileWidgetButton = styled.button`
  ${buttons.button};
  ${components.badge};
`;

const FileWidgetButtonRemove = styled.button`
  ${buttons.button};
  ${components.badgeDanger};
`;

function isMultiple(value) {
  return Array.isArray(value) || List.isList(value);
}

const warnDeprecatedOptions = once(field =>
  console.warn(oneLine`
  Netlify CMS config: ${field.get('name')} field: property "options" has been deprecated for the
  ${field.get('widget')} widget and will be removed in the next major release. Rather than
  \`field.options.media_library\`, apply media library options for this widget under
  \`field.media_library\`.
`),
);

export default function withFileControl({ forImage } = {}) {
  return class FileControl extends React.Component {
    static propTypes = {
      field: PropTypes.object.isRequired,
      getAsset: PropTypes.func.isRequired,
      mediaPaths: ImmutablePropTypes.map.isRequired,
      onAddAsset: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onRemoveInsertedMedia: PropTypes.func.isRequired,
      onOpenMediaLibrary: PropTypes.func.isRequired,
      onClearMediaControl: PropTypes.func.isRequired,
      onRemoveMediaControl: PropTypes.func.isRequired,
      classNameWrapper: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    };

    static defaultProps = {
      value: '',
    };

    constructor(props) {
      super(props);
      this.controlID = uuid();
    }

    shouldComponentUpdate(nextProps) {
      /**
       * Always update if the value changes.
       */
      if (this.props.value !== nextProps.value) {
        return true;
      }

      /**
       * If there is a media path for this control in the state object, and that
       * path is different than the value in `nextProps`, update.
       */
      const mediaPath = nextProps.mediaPaths.get(this.controlID);
      if (mediaPath && nextProps.value !== mediaPath) {
        return true;
      }

      return false;
    }

    componentDidUpdate() {
      const { mediaPaths, value, onRemoveInsertedMedia, onChange } = this.props;
      const mediaPath = mediaPaths.get(this.controlID);
      if (mediaPath && mediaPath !== value) {
        onChange(mediaPath);
      } else if (mediaPath && mediaPath === value) {
        onRemoveInsertedMedia(this.controlID);
      }
    }

    componentWillUnmount() {
      this.props.onRemoveMediaControl(this.controlID);
    }

    handleChange = e => {
      const { field, onOpenMediaLibrary, value } = this.props;
      e.preventDefault();
      let mediaLibraryFieldOptions;

      /**
       * `options` hash as a general field property is deprecated, only used
       * when external media libraries were first introduced. Not to be
       * confused with `options` for the select widget, which serves a different
       * purpose.
       */
      if (field.hasIn(['options', 'media_library'])) {
        warnDeprecatedOptions(field);
        mediaLibraryFieldOptions = field.getIn(['options', 'media_library'], Map());
      } else {
        mediaLibraryFieldOptions = field.get('media_library', Map());
      }

      return onOpenMediaLibrary({
        controlID: this.controlID,
        forImage,
        privateUpload: field.get('private'),
        value,
        allowMultiple: true,
        config: mediaLibraryFieldOptions.get('config'),
      });
    };

    handleRemove = e => {
      e.preventDefault();
      this.props.onClearMediaControl(this.controlID);
      return this.props.onChange('');
    };

    renderFileLink = value => {
      const size = MAX_DISPLAY_LENGTH;
      if (!value || value.length <= size) {
        return value;
      }
      const text = `${value.substring(0, size / 2)}\u2026${value.substring(
        value.length - size / 2 + 1,
        value.length,
      )}`;
      return (
        <FileLink href={value} rel="noopener" target="_blank">
          {text}
        </FileLink>
      );
    };

    renderFileLinks = () => {
      const { value } = this.props;

      if (isMultiple(value)) {
        return (
          <FileLinkList>
            {value.map(val => (
              <li key={val}>{this.renderFileLink(val)}</li>
            ))}
          </FileLinkList>
        );
      }
      return this.renderFileLink(value);
    };

    renderImages = () => {
      const { getAsset, value } = this.props;
      if (isMultiple(value)) {
        return (
          <MultiImageWrapper>
            {value.map(val => {
              const url = transformUrl(val)
              return (
              <ImageWrapper key={url}>
                <Image src={url} />
              </ImageWrapper>
            )
            }
              )}
          </MultiImageWrapper>
        );
      }
      const url = transformUrl(val)
      return (
        <ImageWrapper>
          <Image src={url} />
        </ImageWrapper>
      );
    };

    renderSelection = () => (
      <div>
        {forImage ? this.renderImages() : null}
        <FileInfo>
          {forImage ? null : this.renderFileLinks()}
          <FileWidgetButton onClick={this.handleChange}>
            Edit selection
          </FileWidgetButton>
          <FileWidgetButtonRemove onClick={this.handleRemove}>
            Clear selection
          </FileWidgetButtonRemove>
        </FileInfo>
      </div>
    );

    renderNoSelection = (subject, article) => (
      <FileWidgetButton onClick={this.handleChange}>
        Select images
      </FileWidgetButton>
    );

    render() {
      const { value, classNameWrapper } = this.props;

      return (
        <div className={classNameWrapper}>
          <span>
            {value ? this.renderSelection() : this.renderNoSelection()}
          </span>
        </div>
      );
    }
  };
}
