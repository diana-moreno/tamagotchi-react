import React from 'react';
import styles from './modal.module.scss';
import { MODAL_TEXT_START } from '../constants';

const Modal = ({ modalText }) => {
  return (
    <div className={styles.modal}>
      <p className={styles.modalInner}>{modalText || MODAL_TEXT_START}</p>
    </div>
  );
};

export default Modal;
