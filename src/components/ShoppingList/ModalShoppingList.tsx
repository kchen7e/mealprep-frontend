import _ from "lodash";
import { useState } from "react";
import { Button, Modal, Table, Typography, Row, Col, Empty } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { ShoppingListItem, WeekMealSelection } from "../../static/Type";
import { queryShoppingList } from "../../service/BackendAPI";

const { Title } = Typography;

interface ModalShoppingListProps {
  list: WeekMealSelection;
}

function ModalShoppingList({ list }: ModalShoppingListProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ingredientList, setIngredientList] = useState<ShoppingListItem | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const getShoppingList = async () => {
    setIsOpen(true);
    const currentListStr = sessionStorage.getItem("currentList");

    const currentList: WeekMealSelection | null = currentListStr
      ? (JSON.parse(currentListStr) as WeekMealSelection)
      : null;

    if (currentList && _.isEqual(currentList, list)) {
      return;
    }

    if (!_.isEmpty(list)) {
      try {
        const data = await queryShoppingList(JSON.stringify(list)) as ShoppingListItem | null;
        if (data) {
          sessionStorage.setItem("currentList", JSON.stringify(list));
          setIngredientList(data);
        }
      } catch (error) {
        console.error("Failed to get shopping list:", error);
      }
    }
  };

  interface TableDataItem {
    key: number;
    ingredient: string;
    amount: string | number;
  }

  const tableData: TableDataItem[] = ingredientList
    ? Object.keys(ingredientList).map((key, index) => ({
        key: index,
        ingredient: key,
        amount: ingredientList[key],
      }))
    : [];

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
        width={850}
        styles={{ 
          body: { 
            maxHeight: "70vh", 
            overflowY: "auto", 
            overflowX: "hidden"
          } 
        }}
        getContainer={() => document.getElementById("root") || document.body}
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