import { useState } from "react";
import { Button, Select, Form, Input, Space, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DefaultUserInfo, CountryOptions } from "../../static/constants";
import { downloadUser, registerAccount } from "../../service/BackendAPI";
import Cookies from "js-cookie";

function AccountRegister() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userNameRequired, setuserNameRequired] = useState(false);
    const [emailRequired, setemailRequired] = useState(false);
    const [passwordRequired, setpasswordRequired] = useState(false);
    const [countryRequired, setcountryRequired] = useState(false);

    const [userInfoUpdated, setuserInfoUpdated] = useState({ ...DefaultUserInfo });

    const CountryDropDown = () => (
        <Select
            placeholder="Select Country"
            showSearch
            allowClear
            style={{ width: "100%" }}
            options={CountryOptions}
            value={userInfoUpdated.country ? userInfoUpdated.country : "au"}
            onChange={handleCountryChange}
            filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
        />
    );

    function onTextInputChange(event: React.ChangeEvent<HTMLInputElement>) {
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

    function handleCountryChange(value: string) {
        setuserInfoUpdated((userInfoUpdated) => ({
            ...userInfoUpdated,
            country: value,
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
                        Cookies.set("userName", data.userName, { expires: 30 });
                        // Strip "Bearer " prefix before saving
                        const token = data.token?.replace(/^Bearer\s+/i, "") || "";
                        Cookies.set("userToken", token, { expires: 30 });
                        window.location.reload();
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

    function loginUser() {
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
                        // Strip "Bearer " prefix before saving
                        const token = userInfoOnServer.token?.replace(/^Bearer\s+/i, "") || "";
                        Cookies.set("userToken", token, {
                            expires: 30,
                        });
                        window.location.reload();
                    } else {
                        alert("incorrect user name and password combination");
                    }
                })
                .catch((_: any) => {
                    alert("connection to server error, please try again later");
                });
        }
    }

    function renderHeader() {
        return "Welcome to MealPrep";
    }

    function renderBody() {
        return (
            <>
                <Form layout="vertical">
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="User Name"
                            required
                            validateStatus={userNameRequired ? "error" : ""}
                            style={{ flex: 1 }}
                        >
                            <Input
                                placeholder="alphanumberic, 12 digits max."
                                name="userName"
                                onChange={onTextInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            required
                            validateStatus={emailRequired ? "error" : ""}
                            style={{ flex: 1 }}
                        >
                            <Input
                                placeholder="a.smith@example.com"
                                name="email"
                                onChange={onTextInputChange}
                            />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Form.Item
                            label="Password"
                            required
                            validateStatus={passwordRequired ? "error" : ""}
                            style={{ flex: 1 }}
                        >
                            <Input.Password
                                placeholder="min. 6 digits, numbers and letters"
                                onChange={(e) => {
                                    setuserInfoUpdated((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }));
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Country/Region"
                            required
                            validateStatus={countryRequired ? "error" : ""}
                            style={{ flex: 1 }}
                        >
                            <CountryDropDown />
                        </Form.Item>
                    </div>
                </Form>
            </>
        );
    }

    function renderFooter() {
        return (
            <>
                <Space.Compact style={{ width: "100%" }}>
                    <Button
                        disabled={!(userInfoUpdated.userName && userInfoUpdated.password)}
                        onClick={loginUser}
                        style={{ flex: 1 }}
                    >
                        Login
                    </Button>
                    <Button
                        type="primary"
                        disabled={
                            !(
                                userInfoUpdated.userName &&
                                userInfoUpdated.password &&
                                userInfoUpdated.email &&
                                userInfoUpdated.country
                            )
                        }
                        onClick={registerUser}
                        style={{ flex: 1 }}
                    >
                        Register
                    </Button>
                </Space.Compact>
            </>
        );
    }

    function openModal() {
        setuserInfoUpdated({ ...DefaultUserInfo });
        setIsOpen(true);
    }

    function closeModal() {
        setuserInfoUpdated({ ...DefaultUserInfo });
        setIsOpen(false);
    }

    return (
        <>
            <Button
                onClick={openModal}
                icon={<UserOutlined />}
                style={{
                    backgroundColor: "#FBBD08",
                    borderColor: "#FBBD08",
                    color: "#fff",
                    fontWeight: 600,
                }}
            >
                Register/Login
            </Button>
            <Modal
                title={renderHeader()}
                open={modalIsOpen}
                onCancel={closeModal}
                footer={renderFooter()}
                width={600}
            >
                {renderBody()}
            </Modal>
        </>
    );
}

export default AccountRegister;
