import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { isEqual } from "lodash"; 
import { Button, Space, Form, Input, Modal, Typography } from "antd";
import { HomeOutlined, BookOutlined } from "@ant-design/icons";
import { DefaultUserInfo } from "../../static/constants";
import Cookies from "js-cookie";
import AccountRegister from "./AccountRegister";
import { downloadUser, updateUser, logOutUser } from "../../service/BackendAPI";
import type { UserInfo } from "../../static/Type";
import CountryDropDown from "./CountryDropDown"; 


const { Title } = Typography;

interface AuthInfo {
  userName: string | undefined;
  token: string | undefined;
}

function Account() {
  const cookieUserName = Cookies.get("userName");
  const [userInfoOnServer, setUserInfoOnServer] = useState<UserInfo>({ ...DefaultUserInfo });
  const [userInfoInBrowser, setUserInfoInBrowser] = useState<UserInfo>({ ...DefaultUserInfo });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  useEffect(() => {
    if (Cookies.get("userName") && Cookies.get("userToken")) {
      const authInfo: AuthInfo = {
        userName: Cookies.get("userName"),
        token: Cookies.get("userToken"),
      };
      fillUserInfo(authInfo);
    }
  }, []);

  const fillUserInfo = async (authInfo: AuthInfo) => {
    try {
      const data = await downloadUser(authInfo);
      if (data) {
        setUserInfoOnServer((prev) => ({
          ...prev,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          token: data.token,
        }));
      }
    } catch (error) {
      console.error("Failed to download user info:", error);
    }
  };

  const hasUserInfoChanged = () => {
    // Only compare user-editable fields
    const editableFieldsMatch =
      userInfoInBrowser.firstName === userInfoOnServer.firstName &&
      userInfoInBrowser.lastName === userInfoOnServer.lastName &&
      userInfoInBrowser.email === userInfoOnServer.email &&
      userInfoInBrowser.country === userInfoOnServer.country;
    const hasNewPassword = Boolean(userInfoInBrowser.password);
    return !editableFieldsMatch || hasNewPassword;
  };

  const syncUserInfoBrowserServer = () => {
    if (hasUserInfoChanged()) {
      setUserInfoInBrowser((prev) => ({
        ...prev,
        userName: userInfoOnServer.userName,
        firstName: userInfoOnServer.firstName,
        lastName: userInfoOnServer.lastName,
        email: userInfoOnServer.email,
        country: userInfoOnServer.country,
        password: "",
      }));
    }
  };

  const logOut = async () => {
    if (Cookies.get("userName") && Cookies.get("userToken")) {
      await logOutUser(userInfoOnServer.userName, userInfoOnServer.token);
    }
    // Remove cookies without domain restriction to work on any environment
    Cookies.remove("userName");
    Cookies.remove("userToken");
    // Also try with production domain in case set there
    Cookies.remove("userName", { domain: ".storm7e.de", path: "/" });
    Cookies.remove("userToken", { domain: ".storm7e.de", path: "/" });
    window.location.reload();
  };

  const saveUserInfo = async () => {
    if (!hasUserInfoChanged()) {
      return;
    }

    const updatedUserInfo = {
      ...userInfoInBrowser,
      token: Cookies.get("userToken") || "",
    };

    try {
      const result = await updateUser(updatedUserInfo);
      if (result) {
        setUserInfoOnServer((prev) => ({
          ...prev,
          userName: result.userName,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          country: result.country,
        }));
        // Clear password after successful save
        setUserInfoInBrowser((prev) => ({ ...prev, password: "" }));
        alert("Changes saved successfully");
      } else {
        alert("Save failed - no response from server");
      }
    } catch (error) {
      console.log("backend error: invalid token", error);
      alert("Save failed due to session expire, please login again");
      window.location.reload();
    }
  };

  const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setUserInfoInBrowser((prev) => ({ ...prev, firstName: value }));
        break;
      case "lastName":
        setUserInfoInBrowser((prev) => ({ ...prev, lastName: value }));
        break;
      case "email":
        setUserInfoInBrowser((prev) => ({ ...prev, email: value }));
        break;
      case "password":
        setUserInfoInBrowser((prev) => ({ ...prev, password: value }));
        break;
      default:
        break;
    }
  };

  const handleCountryChange = (value: string) => {
    setUserInfoInBrowser((prev) => ({ ...prev, country: value }));
  };

  const onTextInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.readOnly = false;
  };

  const onTextInputFocusOut = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.readOnly = true;
  };

  const renderHeader = (): ReactNode => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Title level={3} style={{ margin: 0 }}>
        My Account
      </Title>
      <Button
        type="primary"
        disabled={!hasUserInfoChanged()}
        onClick={saveUserInfo}
        size="small"
      >
        Save
      </Button>
    </div>
  );

  const renderBody = (): ReactNode => (
    <>
      <Form layout="vertical">
        <div style={{ display: "flex", gap: "16px" }}>
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
              value={userInfoInBrowser.email}
              onFocus={onTextInputFocus}
              onBlur={onTextInputFocusOut}
              onChange={onTextInputChange}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Password" style={{ flex: 1 }}>
            <Input.Password
              placeholder="Enter new password"
              onChange={(e) => setUserInfoInBrowser((prev) => ({ ...prev, password: e.target.value }))}
              value={userInfoInBrowser.password}
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="First name" style={{ flex: 1 }}>
            <Input
              name="firstName"
              placeholder="First Name"
              value={userInfoInBrowser.firstName}
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
              value={userInfoInBrowser.lastName}
              onFocus={onTextInputFocus}
              onBlur={onTextInputFocusOut}
              onChange={onTextInputChange}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Country/Region" style={{ flex: 1 }}>
            <CountryDropDown
              value={
                isEqual(userInfoInBrowser.country, userInfoOnServer.country)
                  ? userInfoOnServer.country
                  : userInfoInBrowser.country
              }
                          onChange={handleCountryChange}
                      />
          </Form.Item>
        </div>
      </Form>
    </>
  );

  const renderFooter = (): ReactNode => (
    <Space style={{ width: "100%", justifyContent: "space-between" }}>
      <Button type="default" icon={<BookOutlined />}>
        My Own Recipes
      </Button>
      <Button danger onClick={logOut}>
        Logout
      </Button>
    </Space>
  );

  const openModal = () => {
    if (userInfoOnServer.userName) {
      syncUserInfoBrowserServer();
      setIsOpen(true);
      return;
    }
    if (Cookies.get("userName")) {
      fillUserInfo({
        userName: Cookies.get("userName"),
        token: Cookies.get("userToken"),
      });
      if (userInfoOnServer.userName) {
        setUserInfoInBrowser((prev) => ({
          ...prev,
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
  };

  const closeModal = () => {
    syncUserInfoBrowserServer();
    setIsOpen(false);
  };

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
          width={750}
          getContainer={() => document.getElementById("root") || document.body}
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