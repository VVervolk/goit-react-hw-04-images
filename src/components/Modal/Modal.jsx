import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class ModalImage extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    this.props.closeModal(e);
  };

  render() {
    return createPortal(
      <Overlay onClick={this.props.closeModal}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      modalRoot
    );
  }
}
