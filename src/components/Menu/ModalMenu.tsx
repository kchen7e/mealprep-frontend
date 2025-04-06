import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import { Button } from "antd";
import{ CloseOutlined} from '@ant-design/icons';


function ModalMenu({modalButton, renderers}) {
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [finishLoadingMenu, setfinishLoadingMenu] = useState(false);

    useEffect(() => {
        setfinishLoadingMenu(!finishLoadingMenu);
    }, []);

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
            <Button
                color={modalButton.colour}
                onClick={openModal}
                className={finishLoadingMenu ? "" : "disabled"}>
                {modalButton.content}
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Menu">
                <div className="modalContainer">
                    <div className="modalHeader">
                        <CloseOutlined name="close" size="large" onClick={closeModal} />
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
