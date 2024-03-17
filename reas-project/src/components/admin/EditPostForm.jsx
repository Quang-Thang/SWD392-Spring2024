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
    // adminId: "",
    // title: "",
    // description: "",
    // registrationPeriodEnd: "",
    // registrationPeriodStart: "",
    // initialPrice: "",
    // auctionPeriodStart: "",
    // auctionPeriodEnd: "",
    // incrementalPrice: "",
    // realEstateCode: "",
    // ownerId: "",
    if (!editedPost.adminId.trim()) {
      errors.adminId = "Admin ID is required";
    }

    if (!editedPost.title.trim()) {
      errors.title = "Title is required";
    }

    if (!editedPost.description.trim()) {
      errors.description = "Description is required";
    }
    if (!editedPost.thumbnailUrl.trim()) {
      errors.thumbnailUrl = "Thumbnail is required";
    }
    if (
      !editedPost.registrationPeriodStart ||
      editedPost.registrationPeriodStart === ""
    ) {
      errors.registrationPeriodStart = "Register Start is required";
    }

    if (
      !editedPost.registrationPeriodEnd ||
      editedPost.registrationPeriodEnd === ""
    ) {
      errors.registrationPeriodEnd = "Register End is required";
    }

    if (!editedPost.initialPrice || editedPost.initialPrice === "") {
      errors.initialPrice = "Initial Price is required";
    }

    if (
      !editedPost.auctionPeriodStart ||
      editedPost.auctionPeriodStart === ""
    ) {
      errors.auctionPeriodStart = "Auction Start is required";
    }

    if (!editedPost.auctionPeriodEnd || editedPost.auctionPeriodEnd === "") {
      errors.auctionPeriodEnd = "Auction End is required";
    }

    if (!editedPost.incrementalPrice || editedPost.incrementalPrice === "") {
      errors.incrementalPrice = "Incremental Price is required";
    }

    if (!editedPost.realEstateCode.trim()) {
      errors.realEstateCode = "Real estate code is required";
    }

    if (!editedPost.ownerId.trim()) {
      errors.ownerId = "Owner ID is required";
    }
    if (!editedPost.listingDate || editedPost.listingDate === "") {
      errors.listingDate = "Listing Date is required";
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
            Title<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
            {validationErrors.title && (
              <span className="error-message">{validationErrors.title}</span>
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
            Real Estate Code<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="realEstateCode"
              value={editedPost.realEstateCode}
              onChange={handleInputChange}
            />
            {validationErrors.realEstateCode && (
              <span className="error-message">
                {validationErrors.realEstateCode}
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
            Thumbnail<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="thumbnailUrl"
              value={editedPost.thumbnailUrl}
              onChange={handleInputChange}
            />
            {validationErrors.thumbnailUrl && (
              <span className="error-message">
                {validationErrors.thumbnailUrl}
              </span>
            )}
          </label>
          <label>
            Registration Start<span style={{ color: "red" }}>*</span>:
            <input
              type="date"
              name="registrationPeriodStart"
              value={editedPost.registrationPeriodStart}
              onChange={handleInputChange}
            />
            {validationErrors.registrationPeriodStart && (
              <span className="error-message">
                {validationErrors.registrationPeriodStart}
              </span>
            )}
          </label>
          <label>
            Registration End<span style={{ color: "red" }}>*</span>:
            <input
              type="date"
              name="registrationPeriodEnd"
              value={editedPost.registrationPeriodEnd}
              onChange={handleInputChange}
            />
            {validationErrors.registrationPeriodEnd && (
              <span className="error-message">
                {validationErrors.registrationPeriodEnd}
              </span>
            )}
          </label>
          <label>
            Initial Price<span style={{ color: "red" }}>*</span>:
            <input
              type="number"
              name="initialPrice"
              value={editedPost.initialPrice}
              onChange={handleInputChange}
            />
            {validationErrors.initialPrice && (
              <span className="error-message">
                {validationErrors.initialPrice}
              </span>
            )}
          </label>
          <label>
            Listing Date<span style={{ color: "red" }}>*</span>:
            <input
              type="date"
              name="listingDate"
              value={editedPost.listingDate}
              onChange={handleInputChange}
            />
            {validationErrors.listingDate && (
              <span className="error-message">
                {validationErrors.listingDate}
              </span>
            )}
          </label>
          <label>
            Auction Start<span style={{ color: "red" }}>*</span>:
            <input
              type="date"
              name="auctionPeriodStart"
              value={editedPost.auctionPeriodStart}
              onChange={handleInputChange}
            />
            {validationErrors.auctionPeriodStart && (
              <span className="error-message">
                {validationErrors.auctionPeriodStart}
              </span>
            )}
          </label>
          <label>
            Auction End<span style={{ color: "red" }}>*</span>:
            <input
              type="date"
              name="auctionPeriodEnd"
              value={editedPost.auctionPeriodEnd}
              onChange={handleInputChange}
            />
            {validationErrors.auctionPeriodEnd && (
              <span className="error-message">
                {validationErrors.auctionPeriodEnd}
              </span>
            )}
          </label>
          <label>
            Incremental Price<span style={{ color: "red" }}>*</span>:
            <input
              type="number"
              name="incrementalPrice"
              value={editedPost.incrementalPrice}
              onChange={handleInputChange}
            />
            {validationErrors.incrementalPrice && (
              <span className="error-message">
                {validationErrors.incrementalPrice}
              </span>
            )}
          </label>
          <label>
            Status<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="status"
              value={editedPost.status}
              onChange={handleInputChange}
            />
            {validationErrors.status && (
              <span className="error-message">{validationErrors.status}</span>
            )}
          </label>
          <label>
            Owner Id<span style={{ color: "red" }}>*</span>:
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
