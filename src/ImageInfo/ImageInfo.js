import ImageGallery from 'ImageGallery';
import s from './ImageInfo.module.css';
import Button from 'Button';
import Modal from 'Modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageInfo({ query }) {
  const [photo, setPhoto] = useState([]);

  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [tags, setTags] = useState('');

  function fetchImages(query, page) {
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${query}&page=${page}&key=23459982-aeff0c389b47d03a141af0a17`,
    ).then(respons => {
      return respons.json();
    });
  }

  useEffect(() => {
    if (!query) {
      return;
    }
    setPage(1);
    setStatus(Status.PENDING);
    fetchImages(query)
      .then(photo => {
        setPhoto([...photo.hits]);
        setPage(page => page + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => setStatus(Status.REJECTED));
    // eslint-disable-next-line
  }, [query]);

  const loadMore = e => {
    setStatus(Status.PENDING);
    fetchImages(query, page)
      .then(
        newPhoto => setPhoto(prevState => [...prevState, ...newPhoto.hits]),

        setPage(page => page + 1),
        setStatus(Status.RESOLVED),
      )
      .catch(error => setStatus(Status.REJECTED));
  };

  const toggleModal = (modalUrl, tags) => {
    setShowModal(prev => !prev);
    setModalUrl(modalUrl);
    setTags(tags);
  };
  const onGalleryCardClick = e => {
    const tags = e.currentTarget.getAttribute('dataalt');
    const url = e.currentTarget.getAttribute('datalarge');
    toggleModal(url, tags);
  };

  if (status === Status.IDLE) {
    return <div className={s.status__message}>Please enter your search </div>;
  }
  if (status === Status.PENDING) {
    return <div className={s.status__message}>loading...</div>;
  }

  if (photo.length === 0) {
    return (
      <div className={s.status__message}>Sorry we nothing found for you</div>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        {showModal && (
          <Modal onClose={toggleModal} modalUrl={modalUrl} tags={tags} />
        )}
        <ImageGallery photo={photo} onImgClick={onGalleryCardClick} />
        {photo.length > 10 && <Button onClick={loadMore} />}
      </>
    );
  }
}
ImageInfo.propTypes = {
  query: PropTypes.string,
};
