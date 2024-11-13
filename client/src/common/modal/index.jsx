import PropTypes from "prop-types";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModalLayout = ({ children, modalIsOpen, closeModal }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </Modal>
    </>
  );
};

ModalLayout.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
  modalIsOpen: PropTypes.bool,
};
