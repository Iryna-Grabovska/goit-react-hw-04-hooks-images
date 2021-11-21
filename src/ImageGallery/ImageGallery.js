import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  static propTypes = {
    id: PropTypes.string,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    onImgClick: PropTypes.func,
  };
  state = {
    showModal: false,
  };

  render() {
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.props.photo.map(({ id, tags, webformatURL, largeImageURL }) => (
            <li
              className={s.ImageGalleryItem}
              key={id}
              datalarge={largeImageURL}
              onClick={this.props.onImgClick}
            >
              <img
                className={s.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
