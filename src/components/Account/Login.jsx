import React, {useState} from "react";
import Modal from "react-modal";
import {Button, Icon} from "semantic-ui-react";

function Login() {
    function renderHeader() {
        return (
            <>
                <Icon name="close" size="large" onClick={closeModal} />
                <h2>My Account</h2>
            </>
        );
    }

    function renderBody() {
        return (
            <>
                <div class="ui equal width form">
                    <div class="fields">
                        <div class="field">
                            <label>Username</label>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div class="field">
                            <label>Email</label>
                            <input type="text" placeholder="Email" />
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                    </div>
                    <div class="fields">
                        <div class="field">
                            <label>First name</label>
                            <input type="text" placeholder="First Name" />
                        </div>
                        <div class="field">
                            <label>Last name</label>
                            <input type="text" placeholder="Last Name" />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderFooter() {
        return (
            <Button basic color="white">
                {/* <Icon name="home" size="large" /> */}
                <i class="book icon"></i>
                My Own Recipes
            </Button>
        );
    }

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
            <Button basic color="white" onClick={openModal}>
                <Icon name="home" size="large" />
                My Account
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Menu"
            >
                <div class="modalContainer">
                    <div className="modalHeader">{renderHeader()}</div>
                    <div className="modalBody">{renderBody()}</div>
                    <div className="modalFooter">{renderFooter()}</div>
                </div>
            </Modal>
        </>
    );
}

export default Login;
