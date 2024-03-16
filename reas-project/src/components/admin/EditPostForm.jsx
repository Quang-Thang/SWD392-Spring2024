import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const EditPostForm = ({ isOpen, onRequestClose, onEditPost, postToEdit }) => {
  const [editedPost, setEditedPost] = useState(postToEdit || {});
  const [validationErrors, setValidationErrors] = useState({});

  console.log(onEditPost);

  useEffect(() => {
    // Update editedPost when userToEdit changes
    setEditedPost(postToEdit || {});
  }, [postToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!editedPost.ownerId.trim()) {
      errors.ownerId = "Owner ID is required";
    }

    if (!editedPost.realEstateName.trim()) {
      errors.realEstateName = "Name is required";
    }
    if (!editedPost.address.trim()) {
      errors.address = "Address is required";
    }
    if (!editedPost.imageUrl.trim()) {
      errors.imageUrl = "Image is required";
    }

    if (!editedPost.description.trim()) {
      errors.description = "Description is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleEditPost = () => {
    if (validateForm()) {
      onEditPost(editedPost);
      onRequestClose();
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Post Modal"
      className="add-user-form-modal"
    >
      <div className="edit-user-form">
        <h2>Edit Post</h2>
        <form>
          <label>
            OwnerID<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="ownerId"
              value={editedPost.ownerId}
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
              value={editedPost.realEstateName}
              onChange={handleInputChange}
            />
            {validationErrors.realEstateName && (
              <span className="error-message">
                {validationErrors.realEstateName}
              </span>
            )}
          </label>
          <label>
            Address<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="address"
              value={editedPost.address}
              onChange={handleInputChange}
            />
            {validationErrors.address && (
              <span className="error-message">{validationErrors.address}</span>
            )}
          </label>
          <label>
            Description<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="description"
              value={editedPost.description}
              onChange={handleInputChange}
            />
            {validationErrors.description && (
              <span className="error-message">
                {validationErrors.description}
              </span>
            )}
          </label>
          <label>
            Image<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="imageUrl"
              value={editedPost.imageUrl}
              onChange={handleInputChange}
            />
            {validationErrors.imageUrl && (
              <span className="error-message">{validationErrors.imageUrl}</span>
            )}
          </label>
          <label>
            Status:
            <select
              name="status"
              value={editedPost?.status}
              onChange={handleInputChange}
            >
              <option value="Sắp diễn ra">Sắp diễn ra</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <button type="button" onClick={handleEditPost}>
            Update Post
          </button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditPostForm;
