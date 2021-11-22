import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ photo, onImgClick }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {photo.map(({ id, tags, webformatURL, largeImageURL }) => (
          <li
            className={s.ImageGalleryItem}
            key={id}
            dataalt={tags}
            datalarge={largeImageURL}
            onClick={onImgClick}
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

ImageGallery.propTypes = {
  id: PropTypes.string,
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImgClick: PropTypes.func,
};
