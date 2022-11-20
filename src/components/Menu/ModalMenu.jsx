import React, {useState} from "react";
import Modal from "react-modal";
import {Button, Icon} from "semantic-ui-react";

function ModalMenu({modalButton, renderers}) {
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            <Button color={modalButton.colour} onClick={openModal}>
                {modalButton.content}
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Menu"
            >
                <div class="modalContainer">
                    <div className="modalHeader">
                        <Icon name="close" size="large" onClick={closeModal} />
                        {renderers.header()}
                    </div>
                    <div className="modalBody">{renderers.body()}</div>
                    <div className="modalFooter">{renderers.footer()}</div>
                </div>
            </Modal>
        </>
    );
}

export default ModalMenu;
