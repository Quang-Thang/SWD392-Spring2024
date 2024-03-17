import React from "react";
import Modal from "react-modal";

const DeletePostConfirmationModal = ({
  isOpen,
  onRequestClose,
  onDeletePostConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation Modal"
      className="delete-confirmation-modal"
    >
      <div className="delete-confirmation-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={onDeletePostConfirm}>Yes, Delete</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeletePostConfirmationModal;
