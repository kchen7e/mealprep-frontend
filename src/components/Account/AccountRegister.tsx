import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import _ from "lodash";
import { Button, Dropdown } from "antd";
import {CloseOutlined, UserOutlined} from '@ant-design/icons';
import {UserInfo} from "../../static/static";
import {CountryOptions} from "../../static/static";
import {downloadUser, registerAccount} from "../../service/BackendAPI";
import Cookies from "js-cookie";

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
        if (
            userInfoUpdated.userName &&
            userInfoUpdated.password &&
            userInfoUpdated.email &&
            userInfoUpdated.country
        ) {
            registerAccount(userInfoUpdated)
                .then((data) => {
                    if (data) {
                        Cookies.set("userName", data.userName, {expires: 30});
                        Cookies.set("userToken", data.token, {expires: 30});
                        window.location.reload(false);
                    } else {
                        console.log("register account failed");
                        alert("user name taken, please choose another one");
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    console.log("backend connection failed: ", error.message);
                });
        }
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

    function loginUser(event) {
        if (!userInfoUpdated.userName) {
            setuserNameRequired(!userNameRequired);
        }
        if (!userInfoUpdated.password) {
            setpasswordRequired(!passwordRequired);
        }
        if (userInfoUpdated.userName && userInfoUpdated.password) {
            downloadUser(userInfoUpdated)
                .then((userInfoOnServer) => {
                    if (
                        userInfoOnServer &&
                        userInfoUpdated.userName === userInfoOnServer.userName
                    ) {
                        Cookies.set("userName", userInfoOnServer.userName, {
                            expires: 30,
                        });
                        Cookies.set("userToken", userInfoOnServer.token, {
                            expires: 30,
                        });
                        window.location.reload(false);
                    } else {
                        alert("incorrect user name and password combination");
                    }
                })
                .catch((error) => {
                    alert("connection to server error, please try again later");
                });
        }
    }

    function renderHeader() {
        return (
            <>
                <CloseOutlined name="close" size="large" onClick={closeModal} />
                <h2>Welcome to MealPrep</h2>
            </>
        );
    }

    function renderBody() {
        return (
            <>
                <div className="ui form" onSubmit={registerUser}>
                    <div className="two fields">
                        <div
                            className={
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
                            className={
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
                    <div className="two fields">
                        <div
                            className={
                                passwordRequired
                                    ? "error field required"
                                    : "field required"
                            }>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={onTextInputChange}
                                placeholder="min. 6 digits, numbers and letters"
                            />
                        </div>

                        <div
                            className={
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
                <Button basic color="yellow" onClick={openModal}>
                    <UserOutlined name="user" size="large" />
                    Register/Login
                </Button>

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
