import React from "react";
import Modal from "react-modal";
import {Button} from "semantic-ui-react";

import {useState} from "react";

function BreakfastMenu(props) {
    let subtitle;
    Modal.setAppElement("#root");

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "blue";
    }

    function closeModal() {
        setIsOpen(false);
    }

    function renderRecipes() {
        const menu = [];
        for (let i = 0; i < 50; i++) {
            menu.push(<div className="recipeContainer">recipe{i}</div>);
        }

        const menuWrap = <div className="menuContainer">{menu}</div>;
        return menuWrap;
    }

    return (
        <>
            {/* <button onClick={openModal}>Select Breakfast</button> */}
            <Button color="orange" onClick={openModal}>
                Select Breakfast
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Menu"
            >
                <div class="modalContainer">
                    <div className="modalHeader">
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                            Breakfast Menu
                        </h2>
                        <button className="closeButton" onClick={closeModal}>
                            X
                        </button>
                    </div>
                    {renderRecipes()}
                </div>
            </Modal>
        </>
    );
}

export default BreakfastMenu;
