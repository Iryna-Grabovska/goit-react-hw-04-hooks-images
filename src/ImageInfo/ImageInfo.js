import ImageGallery from 'ImageGallery';
import s from './ImageInfo.module.css';
import Button from 'Button';
import Modal from 'Modal';
import { useState, useEffect } from 'react/cjs/react.development';
// import PropTypes from 'prop-types'
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageInfo({ query }) {
  const [photo, setPhoto] = useState([]);
  // const [reject, setReject] = useState(0);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    setPage(1);
    console.log(page);
    setStatus(Status.PENDING);
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${query}&page=${page}&key=23459982-aeff0c389b47d03a141af0a17`,
    )
      .then(respons => {
        return respons.json();
      })
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
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${query}&page=${page}&key=23459982-aeff0c389b47d03a141af0a17`,
    )
      .then(respons => {
        return respons.json();
      })
      .then(
        newPhoto => setPhoto(prevState => [...prevState, ...newPhoto.hits]),

        setPage(page => page + 1),
        setStatus(Status.RESOLVED),
      )
      .catch(error => setStatus(Status.REJECTED));
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });
  };
  // const toggleModal = modalUrl => {
  //   setShowModal(( showModal ) => ({
  //     showModal: !showModal,
  //     modalUrl: modalUrl,
  //   }));
  // };
  const toggleModal = modalUrl => {
    setShowModal(prev => !prev);
    setModalUrl(modalUrl);
  };
  const onGalleryCardClick = e => {
    const url = e.currentTarget.getAttribute('datalarge');
    toggleModal(url);
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
        {showModal && <Modal onClose={toggleModal} modalUrl={modalUrl} />}
        <ImageGallery photo={photo} onImgClick={onGalleryCardClick} />
        {photo.length > 10 && <Button onClick={loadMore} />}
      </>
    );
  }
}
// useEffect(() => {
//   if (!query) {
//     return;
//   }
//   setStatus(Status.PENDING);
//   fetch(
//     `https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&q=${query}&page=${page}&key=23459982-aeff0c389b47d03a141af0a17`,
//   )
//     .then(respons => {
//       return respons.json();
//     })
//     .then(photo => {
//       try {
//         if (page === 1) {
//           setPhoto(photo.hits);
//         } else {
//           setPhoto(prev => [...prev, ...photo.hits]);
//         }
//         setPage(page => page + 1);
//         setStatus(Status.RESOLVED);
//       } catch {
//         throw Error;
//       }
//     })
//     .catch(error => setStatus(Status.REJECTED));
// }, [query, page]);
