import { Modal } from "antd";

const DeleteTheatreModal = ({isOpen, setIsOpen, handleTheatreDelete}) => {

    return (
        <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            okButtonProps={{autoFocus: true}}
            destroyOnHidden={true}
            onOk={handleTheatreDelete}
            title="Delete this theatre?"
        >
            This action once done will delete the theatre forever and is irreversible. Click ok to proceed.
        </Modal>
    )
};

export default DeleteTheatreModal;