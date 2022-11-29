import React, {useState} from "react";
import Modal from "react-modal";
import _ from "lodash";
import {Button, Icon, Dropdown} from "semantic-ui-react";
import {UserInfo} from "../../static/static";
import {CountryOptions} from "../../static/static";

function AccountRegister() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userNameRequired, setuserNameRequired] = useState(false);
    const [emailRequired, setemailRequired] = useState(false);
    const [passwordRequired, setpasswordRequired] = useState(false);
    const [countryRequired, setcountryRequired] = useState(false);
    Modal.setAppElement("#root");

    const [userInfoUpdated, setuserInfoUpdated] = useState({...UserInfo});

    const CountryDropDown = () => (
        <Dropdown
            name="country"
            fluid
            search
            selection
            options={CountryOptions}
            placeholder="Select Country"
            value={userInfoUpdated.country ? userInfoUpdated.country : "au"}
            onChange={handleCountryChange}
        />
    );

    function onTextInputChange(event) {
        event.preventDefault();
        if (event.target.name === "userName") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                userName: event.target.value,
            }));
        } else if (event.target.name === "email") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                email: event.target.value,
            }));
        } else if (event.target.name === "password") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                password: event.target.value,
            }));
        } else if (event.target.name === "country") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                country: event.target.value,
            }));
        }
    }

    function handleCountryChange(event, data) {
        setuserInfoUpdated((userInfoUpdated) => ({
            ...userInfoUpdated,
            country: data.value,
        }));
    }

    function registerUser() {
        if (!userInfoUpdated.userName) {
            setuserNameRequired(!userNameRequired);
        }
        if (!userInfoUpdated.password) {
            setpasswordRequired(!passwordRequired);
        }
        if (!userInfoUpdated.email) {
            setemailRequired(!emailRequired);
        }
        if (!userInfoUpdated.country) {
            setcountryRequired(!countryRequired);
        }
    }

    function loginUser() {
        console.log(userInfoUpdated);
        if (!userInfoUpdated.userName) {
            setuserNameRequired(!userNameRequired);
        }
        if (!userInfoUpdated.password) {
            setpasswordRequired(!passwordRequired);
        }
    }

    function renderHeader() {
        return (
            <>
                <Icon name="close" size="large" onClick={closeModal} />
                <h2>Welcome to MealPrep</h2>
            </>
        );
    }

    function renderBody() {
        return (
            <>
                <div class="ui form" onSubmit={registerUser}>
                    <div class="two fields">
                        <div
                            class={
                                userNameRequired
                                    ? "error field required"
                                    : "field required"
                            }>
                            <label>User Name</label>
                            <input
                                placeholder="alphanumberic, 12 digits max."
                                type="text"
                                onChange={onTextInputChange}
                                name="userName"
                            />
                        </div>
                        <div
                            class={
                                emailRequired
                                    ? "error field required"
                                    : "field required"
                            }>
                            <label>Email</label>
                            <input
                                placeholder="a.smith@example.com"
                                type="text"
                                onChange={onTextInputChange}
                                name="email"
                            />
                        </div>
                    </div>
                    <div class="two fields">
                        <div
                            class={
                                passwordRequired
                                    ? "error field required"
                                    : "field required"
                            }>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={onTextInputChange}
                            />
                        </div>

                        <div
                            class={
                                countryRequired
                                    ? "error field required"
                                    : "field required"
                            }>
                            <label>Coutry/Region*</label>
                            <CountryDropDown />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderFooter() {
        return (
            <>
                <div className="ui buttons">
                    <button
                        className={
                            userInfoUpdated.userName && userInfoUpdated.password
                                ? "ui button active"
                                : "ui button disabled"
                        }
                        onClick={loginUser}>
                        Login
                    </button>
                    <div className="or"></div>
                    <button
                        className={
                            userInfoUpdated.userName &&
                            userInfoUpdated.password &&
                            userInfoUpdated.email &&
                            userInfoUpdated.country
                                ? "ui positive button active"
                                : "ui positive button disabled"
                        }
                        onClick={registerUser}>
                        Register
                    </button>
                </div>
            </>
        );
    }

    function openModal() {
        setuserInfoUpdated({...UserInfo});
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        setuserInfoUpdated({...UserInfo});
        setIsOpen(false);
    }

    return (
        <>
            <div className="ui buttons">
                <Button
                    basic
                    // color="white"
                    onClick={openModal}>
                    <Icon name="user" size="large" />
                    Register/Login
                </Button>
                {/* <div className="or"></div> */}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={closeModal}
                contentLabel="register account">
                <div className="modalContainer">
                    <div className="modalHeader">{renderHeader()}</div>
                    <div className="modalBody">{renderBody()}</div>
                    <div className="modalFooter">{renderFooter()}</div>
                </div>
            </Modal>
        </>
    );
}

export default AccountRegister;
