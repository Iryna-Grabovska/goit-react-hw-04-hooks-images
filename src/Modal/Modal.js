import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

function Modal({ tags, modalUrl, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    return e.code !== 'Escape' ? null : onClose();
  };

  const handleBackdropClick = e => {
    return e.currentTarget !== e.target ? null : onClose();
  };

  return createPortal(
    <div className={s.Modal__backdrop}>
      <div className={s.Modal__content} onClick={handleBackdropClick}>
        <img src={modalUrl} onClick={handleBackdropClick} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
