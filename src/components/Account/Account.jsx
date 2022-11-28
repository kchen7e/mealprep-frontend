import React, {useEffect, useState, useRef} from "react";
import Modal from "react-modal";
import _ from "lodash";
import {Button, Icon, Dropdown} from "semantic-ui-react";
import {getUserInfo, updateUserInfo} from "../../service/UserService";
import {UserInfo} from "../../static/static";
import {CountryOptions} from "../../static/static";
import Cookies from "js-cookie";

function Account() {
    const userInfo = useRef({...UserInfo});
    Modal.setAppElement("#root");
    var userName = Cookies.get("userName");
    const [userInfoUpdated, setuserInfoUpdated] = useState({...UserInfo});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);

    useEffect(() => {
        console.log("username is ", userName);
        console.log("userinfo current is ", userInfo.current);
        if (!userName || userInfo.current.userName) {
            console.log("set cookie");
            Cookies.set("userName", "Amy");
            userInfo.current.userName = Cookies.get("userName");
        }
        fillUserInfo(userName, userInfo.current);
    }, []);

    const fillUserInfo = (userName, userInfo) => {
        getUserInfo(userName, "")
            .then((info) => {
                if (info) {
                    Object.keys(userInfo).forEach((key) => {
                        userInfo[key] = info[key];
                    });
                    setuserInfoUpdated((userInfoUpdated) => ({
                        ...userInfoUpdated,
                        id: info.id,
                        userName: info.userName,
                        firstName: info.firstName,
                        lastName: info.lastName,
                        email: info.email,
                    }));
                }
            })
            .catch((err) => {
                alert("backend offline");
            });
    };

    const CountryDropDown = () => (
        <Dropdown
            name="country"
            clearable
            fluid
            search
            selection
            options={CountryOptions}
            placeholder="Select Country"
            onChange={handleCountryChange}
            // defaultValue={userInfo.current.country}
            value={
                userInfoUpdated.country &&
                !_.isEqual(userInfo.current.country, userInfoUpdated.country)
                    ? userInfoUpdated.country
                    : userInfo.current.country
            }
        />
    );

    function saveUserInfo() {
        setIsOnHold(true);
        updateUserInfo(userInfoUpdated)
            .then((result) => {
                setIsOnHold(false);
                Object.keys(userInfo.current).forEach((key) => {
                    userInfo.current[key] = userInfoUpdated[key];
                });
            })
            .catch((error) => {
                setIsOnHold(false);
                alert("backend offline, save failed");
            });
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
        }
    }

    function handleCountryChange(event, data) {
        setuserInfoUpdated((userInfoUpdated) => ({
            ...userInfoUpdated,
            country: data.value,
        }));
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
                    <button
                        ref={(ref) => {}}
                        className="ui button"
                        onClick={closeModal}>
                        Exit
                    </button>
                    <div className="or"></div>
                    <button
                        ref={(ref) => {}}
                        className={
                            _.isEqual(userInfo.current, userInfoUpdated)
                                ? "ui positive button disabled"
                                : "ui positive button active"
                        }
                        onClick={saveUserInfo}>
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
                ref={(ref) => {}}
                basic
                // color="white"
            >
                {/* <Icon name="home" size="large" /> */}
                <i className="book icon"></i>
                My Own Recipes
            </Button>
        );
    }

    function openModal() {
        console.log(userInfo);
        if (!userInfo.current.userName) {
            fillUserInfo(Cookies.get("userName"), userInfo.current);
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                id: userInfo.current.id,
                userName: userInfo.current.userName,
                firstName: userInfo.current.firstName,
                lastName: userInfo.current.lastName,
                email: userInfo.current.email,
            }));
        }
        if (!userInfo.current.userName) {
            alert("registration page");
        } else {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                userName: userInfo.current.userName,
                firstName: userInfo.current.firstName,
                lastName: userInfo.current.lastName,
                email: userInfo.current.email,
            }));
            setIsOpen(true);
        }
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        setIsOpen(false);
        if (!_.isEqual(userInfo.current.country, userInfoUpdated.country)) {
            setuserInfoUpdated((userInfoUpdated) => ({
                ...userInfoUpdated,
                id: userInfo.current.id,
                userName: userInfo.current.userName,
                firstName: userInfo.current.firstName,
                lastName: userInfo.current.lastName,
                email: userInfo.current.email,
                country: userInfo.current.country,
            }));
        }
    }

    return (
        <>
            <Button
                basic
                // color="white"
                ref={(ref) => {}}
                onClick={openModal}>
                <Icon name="home" size="large" />
                My Account
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={closeModal}
                contentLabel="my account">
                <div className="modalContainer">
                    <div className="modalHeader">{renderHeader()}</div>
                    <div className="modalBody">{renderBody()}</div>
                    <div className="modalFooter">{renderFooter()}</div>
                </div>
            </Modal>
            <div
                className="overlay"
                style={{display: isOnHold ? "block" : "none"}}></div>
        </>
    );
}

export default Account;
