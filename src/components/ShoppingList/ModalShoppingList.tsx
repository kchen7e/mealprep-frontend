import _ from "lodash";
import React, { useState } from "react";
import { Button, Modal, Table, Typography, Row, Col, Empty } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { queryShoppingList } from "../../service/BackendAPI";

const { Title } = Typography;

function ModalShoppingList({ list }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ingredientList, setingredientList] = useState<Record<string, string> | null>(null);

    function closeModal() {
        setIsOpen(false);
    }

    function getShoppingList() {
        setIsOpen(true);
        const currentList = sessionStorage.getItem("currentList");
        if (currentList) {
            const currentListObj = JSON.parse(currentList);
            if (_.isEqual(currentListObj, list)) {
                return;
            }
        }
        if (!_.isEmpty(list)) {
            queryShoppingList(JSON.stringify(list)).then((data) => {
                if (data) {
                    sessionStorage.setItem("currentList", JSON.stringify(list));
                    setingredientList(data);
                }
            });
        }
    }

    const columns = [
        {
            title: "Ingredient",
            dataIndex: "ingredient",
            key: "ingredient",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
    ];

    const tableData = ingredientList
        ? Object.keys(ingredientList).map((key, index) => ({
              key: index,
              ingredient: key,
              amount: ingredientList[key],
          }))
        : [];

    return (
        <>
            <Button
                onClick={getShoppingList}
                icon={<ShoppingCartOutlined />}
                style={{
                    backgroundColor: "#FBBD08",
                    borderColor: "#FBBD08",
                    color: "#fff",
                    fontWeight: 600,
                    marginLeft: 20,
                }}
            >
                Get Shopping List
            </Button>
            <Modal
                title="Shopping List"
                open={modalIsOpen}
                onCancel={closeModal}
                footer={null}
                width={800}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Title level={4}>You need these Ingredients</Title>
                        {ingredientList ? (
                            <Table
                                columns={columns}
                                dataSource={tableData}
                                pagination={false}
                                size="small"
                            />
                        ) : (
                            <Empty description="No Recipe Selected" />
                        )}
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Recommended to buy these in your local store</Title>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default ModalShoppingList;
