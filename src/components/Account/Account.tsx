import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import _ from "lodash";
import { Button, Dropdown } from "antd";
import{ HomeOutlined} from '@ant-design/icons';
import {UserInfo} from "../../static/static";
import {CountryOptions} from "../../static/static";
import Cookies from "js-cookie";
import AccountRegister from "./AccountRegister";
import {downloadUser, updateUser, logOutUser} from "../../service/BackendAPI";

function Account() {
    // var userInfoOnServer = {...UserInfo};
    Modal.setAppElement("#root");
    let cookieUserName = Cookies.get("userName");
    const [userInfoOnServer, setuserInfoOnServer] = useState({...UserInfo});
    const [userInfoInBrowser1, setuserInfoInBrowser1] = useState({...UserInfo});
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);

    useEffect(() => {
        if (Cookies.get("userName") && Cookies.get("userToken")) {
            const authInfo = {
                userName: Cookies.get("userName"),
                token: Cookies.get("userToken"),
            };
            fillUserInfo(authInfo);
        }
    }, []);

    const fillUserInfo = (authInfo) => {
        downloadUser(authInfo).then((data) => {
            if (data) {
                setuserInfoOnServer((userInfoOnServer) => ({
                    ...userInfoOnServer,
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    country: data.country,
                    token: data.token,
                }));
            } else {
                //no info or backend issue
                // alert("backend offline");
            }
        });
    };

    const syncUserInfoBrowserServer = () => {
        if (!_.isEqual(userInfoInBrowser1, userInfoOnServer)) {
            setuserInfoInBrowser1((userInfoInBrowser1) => ({
                ...userInfoInBrowser1,
                userName: userInfoOnServer.userName,
                firstName: userInfoOnServer.firstName,
                lastName: userInfoOnServer.lastName,
                email: userInfoOnServer.email,
                country: userInfoOnServer.country,
                password: "",
            }));
        }
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
                _.isEqual(userInfoInBrowser1.country, userInfoOnServer.country)
                    ? userInfoOnServer.country
                    : userInfoInBrowser1.country
            }
        />
    );

    function logOut() {
        if (Cookies.get("userName") && Cookies.get("userToken")) {
            //call server to remove the token
            logOutUser(userInfoOnServer.userName, userInfoOnServer.token);
        }
        Cookies.remove("userName", {domain: ".storm7e.de"});
        Cookies.remove("userToken", {domain: ".storm7e.de"});
        window.location.reload(false);
    }

    function saveUserInfo() {
        userInfoInBrowser1.token = Cookies.get("userToken");
        updateUser(userInfoInBrowser1)
            .then((result) => {
                if (result) {
                    // setIsOnHold(false);
                    setuserInfoOnServer((userInfoOnServer) => ({
                        ...userInfoOnServer,
                        userName: result.userName,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        country: result.country,
                    }));
                } else {
                    console.log("backend error: invalid token");
                    alert(
                        "save failed due to session expire, please login again"
                    );
                    window.location.reload(false);
                }
            })
            .catch((error) => {
                alert("backend offline, please try again later");
                console.log("backend connection failed: ", error.message);
            });
    }

    function onTextInputChange(event) {
        event.preventDefault();
        if (event.target.name === "firstName") {
            setuserInfoInBrowser1((userInfoInBrowser1) => ({
                ...userInfoInBrowser1,
                firstName: event.target.value,
            }));
        } else if (event.target.name === "lastName") {
            setuserInfoInBrowser1((userInfoInBrowser1) => ({
                ...userInfoInBrowser1,
                lastName: event.target.value,
            }));
        } else if (event.target.name === "email") {
            setuserInfoInBrowser1((userInfoInBrowser1) => ({
                ...userInfoInBrowser1,
                email: event.target.value,
            }));
        } else if (event.target.name === "password") {
            setuserInfoInBrowser1((userInfoInBrowser1) => ({
                ...userInfoInBrowser1,
                password: event.target.value,
            }));
        }
    }

    function handleCountryChange(event, data) {
        setuserInfoInBrowser1((userInfoInBrowser1) => ({
            ...userInfoInBrowser1,
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
                        onClick={logOut}>
                        Exit
                    </button>
                    <div className="or"></div>
                    <button
                        ref={(ref) => {}}
                        className={
                            _.isEqual(userInfoInBrowser1, userInfoOnServer)
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
                            <label>User Name</label>
                            <input
                                name="userName"
                                disabled
                                type="text"
                                placeholder="User Name"
                                value={userInfoOnServer.userName}
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
                                value={userInfoInBrowser1.email}
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
                                value={userInfoInBrowser1.password}
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
                                value={userInfoInBrowser1.firstName}
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
                                value={userInfoInBrowser1.lastName}
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
        if (userInfoOnServer.userName) {
            syncUserInfoBrowserServer();
            setIsOpen(true);
            return;
        }
        if (Cookies.get("userName")) {
            //2nd attempt, in case of network issue previously
            fillUserInfo(Cookies.get("userName"));
            if (userInfoOnServer.userName) {
                setuserInfoInBrowser1((userInfoInBrowser1) => ({
                    ...userInfoInBrowser1,
                    userName: userInfoOnServer.userName,
                    firstName: userInfoOnServer.firstName,
                    lastName: userInfoOnServer.lastName,
                    email: userInfoOnServer.email,
                    country: userInfoOnServer.country,
                }));
                setIsOpen(true);
                return;
            }
        }
        alert("registration page");
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        syncUserInfoBrowserServer();
        setIsOpen(false);
    }

    if (userInfoOnServer.userName) {
        return (
            <>
                <Button basic white onClick={openModal} color="yellow">
                    <HomeOutlined name="home" size="large" />
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
                {/* <div
                className="overlay"
                style={{display: isOnHold ? "block" : "none"}}></div> */}
            </>
        );
    } else {
        return <AccountRegister />;
    }
}

export default Account;
