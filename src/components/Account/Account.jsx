import React, {useEffect, useState, useRef} from "react";
import Modal from "react-modal";
import _ from "lodash";
import {Button, Icon} from "semantic-ui-react";
import {getUserInfo, updateUserInfo} from "../../service/UserService";
import CountryDropDown from "./CountryDropDown";
import {UserInfo} from "../../static/static";
import {isFocusable} from "@testing-library/user-event/dist/utils";
import {hide} from "react-modal/lib/helpers/ariaAppHider";

function Account() {
    const [userInfo, setUserInfo] = useState({...UserInfo});
    const [userInfoUpdated, setuserInfoUpdated] = useState({...UserInfo});
    const [saveButtonStatus, setsaveButtonStatus] = useState("disabled");

    useEffect(() => {
        getUserInfo("kevin", "").then((info) => {
            console.log(info);
            setUserInfo((userInfo) => ({
                ...userInfo,
                id: info.id,
                userName: info.userName,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
            }));
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                id: info.id,
                userName: info.userName,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
            }));
        });
    }, []);

    function saveUserInfo() {
        if (updateUserInfo(userInfoUpdated)) {
            setUserInfo((userInfo) => ({
                ...userInfo,
                id: userInfoUpdated.id,
                userName: userInfoUpdated.userName,
                firstName: userInfoUpdated.firstName,
                lastName: userInfoUpdated.lastName,
                email: userInfoUpdated.email,
            }));
            setsaveButtonStatus("disabled");
        }
        alert("update failed");
    }

    function onTextInputChange(event) {
        event.preventDefault();
        if (event.target.name === "userName") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                userName: event.target.value,
            }));
        } else if (event.target.name === "firstName") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                firstName: event.target.value,
            }));
        } else if (event.target.name === "lastName") {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                lastName: event.target.value,
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

    function onTextInputFocus(event) {
        event.preventDefault();
        event.target.readOnly = false;
    }

    function onTextInputFocusOut(event) {
        event.preventDefault();
        event.target.readOnly = true;
    }

    function renderHeader() {
        return (
            <>
                <div className="ui buttons">
                    <button className="ui button" onClick={closeModal}>
                        Exit
                    </button>
                    <div className="or"></div>
                    <button
                        className={
                            _.isEqual(userInfo, userInfoUpdated)
                                ? "ui positive button disabled"
                                : "ui positive button active"
                        }
                        onClick={saveUserInfo}
                    >
                        Save
                    </button>
                </div>
                <h2>My Account</h2>
            </>
        );
    }

    function renderBody() {
        return (
            <>
                <div className="ui equal width form">
                    <div className="fields">
                        <div className="field">
                            <label>Username</label>
                            <input
                                name="userName"
                                type="text"
                                placeholder="Username"
                                value={
                                    userInfoUpdated.userName
                                        ? userInfoUpdated.userName
                                        : ""
                                }
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={
                                    userInfoUpdated.email
                                        ? userInfoUpdated.email
                                        : ""
                                }
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                value={
                                    userInfoUpdated.password
                                        ? userInfoUpdated.password
                                        : "placeholderonly"
                                }
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="fields">
                        <div className="field">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={
                                    userInfoUpdated.firstName
                                        ? userInfoUpdated.firstName
                                        : ""
                                }
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </div>
                        <div className="field">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={
                                    userInfoUpdated.lastName
                                        ? userInfoUpdated.lastName
                                        : ""
                                }
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </div>
                        <div className="field">
                            <label>Coutry/Region</label>
                            <CountryDropDown />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function renderFooter() {
        return (
            <Button
                basic
                // color="white"
            >
                {/* <Icon name="home" size="large" /> */}
                <i className="book icon"></i>
                My Own Recipes
            </Button>
        );
    }

    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        // getUserInfo("kevin", "").then((info) => {
        //     setUserInfo((userInfo) => ({
        //         ...userInfo,
        //         id: info.id,
        //         userName: info.userName,
        //         firstName: info.firstName,
        //         lastName: info.lastName,
        //         email: info.email,
        //     }));
        //     setuserInfoUpdated((userInfoUpdated) => ({
        //         ...userInfoUpdated,
        //         id: info.id,
        //         userName: info.userName,
        //         firstName: info.firstName,
        //         lastName: info.lastName,
        //         email: info.email,
        //     }));
        // });
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        setIsOpen(false);
        getUserInfo("kevin", "").then((info) => {
            setUserInfo((userInfo) => ({
                ...userInfo,
                id: info.id,
                userName: info.userName,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
            }));
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                id: info.id,
                userName: info.userName,
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
            }));
        });
    }

    return (
        <>
            <Button
                basic
                // color="white"
                onClick={openModal}
            >
                <Icon name="home" size="large" />
                My Account
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={closeModal}
                shouldCloseOnEsc={closeModal}
                contentLabel="my account"
            >
                <div className="modalContainer">
                    <div className="modalHeader">{renderHeader()}</div>
                    <div className="modalBody">{renderBody()}</div>
                    <div className="modalFooter">{renderFooter()}</div>
                </div>
            </Modal>
        </>
    );
}

export default Account;
