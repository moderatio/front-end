import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

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

const CustomModal = ({ isOpen, onClose, children }: Props) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={closeModal}
          >
            {/* content */}
            {/* header and body */}
            <div className="m-5">{children}</div>
            {/* footer */}
            <div className="flex items-center justify-end p-6  rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default CustomModal;
