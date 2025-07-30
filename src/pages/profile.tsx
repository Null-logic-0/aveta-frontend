import { useNavigate } from "react-router";
import Modal from "../components/UI/modal/Modal";

function Profile() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <>
      <Modal onClose={handleClose}>
        <div className="p-4">Profile modal content here</div>
      </Modal>
    </>
  );
}

export default Profile;
