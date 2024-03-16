import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const AddPostForm = ({ isOpen, onRequestClose, onAddPost }) => {
  const [newPost, setNewPost] = useState({
    ownerId: "",
    realEstateName: "",
    address: "",
    imageUrl: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!newPost.ownerId.trim()) {
      errors.ownerId = "Owner ID is required";
    }

    if (!newPost.realEstateName.trim()) {
      errors.realEstateName = "Name is required";
    }
    if (!newPost.address.trim()) {
      errors.address = "Address is required";
    }
    if (!newPost.imageUrl.trim()) {
      errors.imageUrl = "Image is required";
    }

    if (!newPost.description.trim()) {
      errors.description = "Description is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleAddPost = () => {
    if (validateForm()) {
      onAddPost(newPost);
      setNewPost({
        ownerId: "",
        realEstateName: "",
        address: "",
        imageUrl: "",
        description: "",
      });
      setValidationErrors({});
      onRequestClose(); // Close the modal after adding the post
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Post Modal"
      className="add-user-form-modal"
    >
      <div className="add-user-form">
        <h2>Add New Post</h2>
        <form>
          <label>
            OwnerID<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="ownerId"
              value={newPost.ownerId}
              onChange={handleInputChange}
            />
            {validationErrors.ownerId && (
              <span className="error-message">{validationErrors.ownerId}</span>
            )}
          </label>
          <label>
            Name<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="realEstateName"
              value={newPost.realEstateName}
              onChange={handleInputChange}
            />
            {validationErrors.address && (
              <span className="error-message">
                {validationErrors.realEstateName}
              </span>
            )}
          </label>
          {/* <label>
            Status:
            <select
              name="status"
              value={newPost?.status}
              onChange={handleInputChange}
            >
              <option value="Sắp diễn ra">Sắp diễn ra</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label> */}
          <label>
            Address<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="address"
              value={newPost.address}
              onChange={handleInputChange}
            />
            {validationErrors.address && (
              <span className="error-message">{validationErrors.address}</span>
            )}
          </label>
          <label>
            Image<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="imageUrl"
              value={newPost.imageUrl}
              onChange={handleInputChange}
            />
            {validationErrors.imageUrl && (
              <span className="error-message">{validationErrors.imageUrl}</span>
            )}
          </label>
          <label>
            Description<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="description"
              value={newPost.description}
              onChange={handleInputChange}
            />
            {validationErrors.description && (
              <span className="error-message">
                {validationErrors.description}
              </span>
            )}
          </label>
          <button type="button" onClick={handleAddPost}>
            Add Post
          </button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPostForm;
