import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getOwners } from "../../services/UserService";
import { useSelector } from "react-redux";
Modal.setAppElement("#root"); // Set the root element for accessibility

const AddPostForm = ({ isOpen, onRequestClose, onAddPost }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [owner, setOwner] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [newPost, setNewPost] = useState({
    adminId: "",
    title: "",
    status: "",
    description: "",
    registrationPeriodEnd: "",
    registrationPeriodStart: "",
    initialPrice: "",
    auctionPeriodStart: "",
    auctionPeriodEnd: "",
    incrementalPrice: "",
    realEstateCode: "",
    ownerId: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const fetchOwnerData = async () => {
    try {
      const response = await getOwners();
      setOwner(response);
      // console.log("Response:", response?.data);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };
  useEffect(() => {
    fetchOwnerData();
  });
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

    if (!newPost.title.trim()) {
      errors.title = "Title is required";
    }

    if (!newPost.description.trim()) {
      errors.description = "Description is required";
    }

    if (
      !newPost.registrationPeriodStart ||
      newPost.registrationPeriodStart === ""
    ) {
      errors.registrationPeriodStart = "Register Start is required";
    }

    if (
      !newPost.registrationPeriodEnd ||
      newPost.registrationPeriodEnd === ""
    ) {
      errors.registrationPeriodEnd = "Register End is required";
    }

    if (!newPost.initialPrice || newPost.initialPrice === "") {
      errors.initialPrice = "Initial Price is required";
    }

    if (!newPost.auctionPeriodStart || newPost.auctionPeriodStart === "") {
      errors.auctionPeriodStart = "Auction Start is required";
    }

    if (!newPost.auctionPeriodEnd || newPost.auctionPeriodEnd === "") {
      errors.auctionPeriodEnd = "Auction End is required";
    }

    if (!newPost.incrementalPrice || newPost.incrementalPrice === "") {
      errors.incrementalPrice = "Incremental Price is required";
    }

    if (!newPost.realEstateCode.trim()) {
      errors.realEstateCode = "Real estate code is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleAddPost = () => {
    if (validateForm()) {
      onAddPost(newPost);
      setNewPost({
        adminId: "",
        title: "",
        status: "",
        description: "",
        registrationPeriodEnd: "",
        registrationPeriodStart: "",
        initialPrice: "",
        auctionPeriodStart: "",
        auctionPeriodEnd: "",
        incrementalPrice: "",
        realEstateCode: "",
        ownerId: "",
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
        <h2>Tạo 1 bài đăng mới</h2>
        <form>
          <label>
            Admin:
            <input
              type="text"
              name="adminId"
              value={user?.userInfo.userId}
              readOnly // Make the input read-only to prevent user input
            />
          </label>
          <label>
            Tiêu đề<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
            />
            {validationErrors.title && (
              <span className="error-message">{validationErrors.title}</span>
            )}
          </label>
          <label>
            Trạng thái:
            <select
              name="status"
              value={newPost?.status}
              onChange={handleInputChange}
            >
              <option value="Sắp diễn ra">Sắp diễn ra</option>
              <option value="Đang diễn ra">Đang diễn ra</option>
              <option value="Đã thanh lý">Đã thanh lý</option>
            </select>
          </label>
          <label>
            Mô tả<span style={{ color: "red" }}>*</span>:
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
          <label>
            Thời gian bắt đầu đăng kí:
            <input
              type="date"
              name="registrationPeriodStart"
              value={newPost.registrationPeriodStart}
              onChange={handleInputChange}
            />
            {validationErrors.registrationPeriodStart && (
              <span className="error-message">
                {validationErrors.registrationPeriodStart}
              </span>
            )}
          </label>
          <label>
            Thời gian kết thúc đăng kí:
            <input
              type="date"
              name="registrationPeriodEnd"
              value={newPost.registrationPeriodEnd}
              onChange={handleInputChange}
            />
            {validationErrors.registrationPeriodEnd && (
              <span className="error-message">
                {validationErrors.registrationPeriodEnd}
              </span>
            )}
          </label>
          <label>
            Giá khởi điểm<span style={{ color: "red" }}>*</span>:
            <input
              type="number"
              name="initialPrice"
              value={newPost.initialPrice}
              onChange={handleInputChange}
            />
            {validationErrors.initialPrice && (
              <span className="error-message">
                {validationErrors.initialPrice}
              </span>
            )}
          </label>
          <label>
            Thời gian bắt đầu đấu giá:
            <input
              type="date"
              name="auctionPeriodStart"
              value={newPost.auctionnPeriodStart}
              onChange={handleInputChange}
            />
            {validationErrors.auctionnPeriodStart && (
              <span className="error-message">
                {validationErrors.auctionnPeriodStart}
              </span>
            )}
          </label>
          <label>
            Thời gian kết thúc đấu giá:
            <input
              type="date"
              name="auctionPeriodEnd"
              value={newPost.auctionPeriodEnd}
              onChange={handleInputChange}
            />
            {validationErrors.auctionPeriodEnd && (
              <span className="error-message">
                {validationErrors.auctionPeriodEnd}
              </span>
            )}
          </label>
          <label>
            Bước giá<span style={{ color: "red" }}>*</span>:
            <input
              type="number"
              name="incrementalPrice"
              value={newPost.incrementalPrice}
              onChange={handleInputChange}
            />
            {validationErrors.incrementalPrice && (
              <span className="error-message">
                {validationErrors.incrementalPrice}
              </span>
            )}
          </label>
          <label>
            Mã bất động sản<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="realEstateCode"
              value={newPost.realEstateCode}
              onChange={handleInputChange}
            />
            {validationErrors.realEstateCode && (
              <span className="error-message">
                {validationErrors.realEstateCode}
              </span>
            )}
          </label>
          <label>
            Chủ sở hữu:
            <select name="ownerId" onChange={handleInputChange}>
              {owner.map((owner) => (
                <option
                  key={owner.realEstateOwnerId}
                  value={owner.realEstateOwnerId}
                >
                  {owner.fullName}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={handleAddPost}>
            Thêm bài đăng
          </button>
          <button type="button" onClick={onRequestClose}>
            Hủy
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddPostForm;
