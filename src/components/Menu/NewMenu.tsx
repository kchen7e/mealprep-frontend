import React from "react";
import { Button, Modal, Space } from "antd";
import { ArrowRightOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";

function NewMenu() {
    const [firstOpen, setFirstOpen] = React.useState(false);
    const [secondOpen, setSecondOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setFirstOpen(true)}>Open first Modal</Button>

            <Modal
                title="Modal #1"
                open={firstOpen}
                onCancel={() => setFirstOpen(false)}
                footer={
                    <Button type="primary" onClick={() => setSecondOpen(true)}>
                        Proceed <RightOutlined />
                    </Button>
                }
            >
                <Space align="center">
                    <ArrowRightOutlined style={{ fontSize: 24 }} />
                    <p>We have more to share with you. Follow us along to modal 2</p>
                </Space>
            </Modal>

            <Modal
                title="Modal #2"
                open={secondOpen}
                onCancel={() => setSecondOpen(false)}
                width={400}
                footer={
                    <Button
                        icon={<CheckOutlined />}
                        onClick={() => {
                            setSecondOpen(false);
                            setFirstOpen(false);
                        }}
                    >
                        All Done
                    </Button>
                }
            >
                <p>That's everything!</p>
            </Modal>
        </>
    );
}

export default NewMenu;
