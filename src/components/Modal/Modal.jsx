import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function ModalImage({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    closeModal(e);
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
}

ModalImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
