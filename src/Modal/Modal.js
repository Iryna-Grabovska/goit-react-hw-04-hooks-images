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
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log('backdrop', e.target);
      onClose();
    }
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

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import s from './Modal.module.css';
// import PropTypes from 'prop-types';
// const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
//   static propTypes = {
//     modalUrl: PropTypes.string,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       console.log('backdrop', e.target);
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Modal__backdrop}>
//         <div className={s.Modal__content} onClick={this.handleBackdropClick}>
//           <img
//             src={this.props.modalUrl}
//             onClick={this.handleBackdropClick}
//             alt={this.props.tags}
//           />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
