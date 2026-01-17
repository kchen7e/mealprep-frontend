import React, {useEffect, useState} from "react";
import _ from "lodash";
import { Button, Space, Form, Input, Select, Modal, Typography } from "antd";
import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import { DefaultUserInfo, CountryOptions } from "../../static/constants";
import Cookies from "js-cookie";
import AccountRegister from "./AccountRegister";
import { downloadUser, updateUser, logOutUser } from "../../service/BackendAPI";

const { Title } = Typography;

function Account() {
    let cookieUserName = Cookies.get("userName");
    const [userInfoOnServer, setuserInfoOnServer] = useState({...DefaultUserInfo});
    const [userInfoInBrowser1, setuserInfoInBrowser1] = useState({...DefaultUserInfo});
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
        <Select
            placeholder="Select Country"
            showSearch
            allowClear
            style={{ width: '100%' }}
            options={CountryOptions}
            value={
                _.isEqual(userInfoInBrowser1.country, userInfoOnServer.country)
                    ? userInfoOnServer.country
                    : userInfoInBrowser1.country
            }
            onChange={handleCountryChange}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
        window.location.reload();
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
                    window.location.reload();
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
    
    function handleCountryChange(value: string) {
        setuserInfoInBrowser1((userInfoInBrowser1) => ({
            ...userInfoInBrowser1,
            country: value,
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
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Title level={3} style={{ margin: 0 }}>My Account</Title>
                <Space.Compact>
                    <Button danger onClick={logOut}>Exit</Button>
                    <Button
                        type="primary"
                        disabled={_.isEqual(userInfoInBrowser1, userInfoOnServer)}
                        onClick={saveUserInfo}
                    >
                        Save
                    </Button>
                </Space.Compact>
            </Space>
        );
    }

    function renderBody() {
        return (
            <>
                <Form layout="vertical">
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item label="User Name" style={{ flex: 1 }}>
                            <Input
                                name="userName"
                                disabled
                                placeholder="User Name"
                                value={userInfoOnServer.userName}
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item label="Email" style={{ flex: 1 }}>
                            <Input
                                name="email"
                                placeholder="Email"
                                value={userInfoInBrowser1.email}
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item label="Password" style={{ flex: 1 }}>
                            <Input.Password
                                name="password"
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                value={userInfoInBrowser1.password}
                                readOnly
                            />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Form.Item label="First name" style={{ flex: 1 }}>
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                value={userInfoInBrowser1.firstName}
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item label="Last name" style={{ flex: 1 }}>
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                value={userInfoInBrowser1.lastName}
                                onFocus={onTextInputFocus}
                                onBlur={onTextInputFocusOut}
                                onChange={onTextInputChange}
                                readOnly
                            />
                        </Form.Item>
                        <Form.Item label="Country/Region" style={{ flex: 1 }}>
                            <CountryDropDown />
                        </Form.Item>
                    </div>
                </Form>
            </>
        );
    }

    function renderFooter() {
        return (
            <Button type="default" icon={<BookOutlined />}>
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

    function closeModal() {
        syncUserInfoBrowserServer();
        setIsOpen(false);
    }

    if (userInfoOnServer.userName) {
        return (
            <>
                <Button
                    onClick={openModal}
                    icon={<HomeOutlined />}
                    style={{
                        backgroundColor: "#FBBD08",
                        borderColor: "#FBBD08",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                >
                    My Account
                </Button>
                <Modal
                    title={renderHeader()}
                    open={modalIsOpen}
                    onCancel={closeModal}
                    footer={renderFooter()}
                    width={700}
                >
                    {renderBody()}
                </Modal>
            </>
        );
    } else {
        return <AccountRegister />;
    }
}

export default Account;
