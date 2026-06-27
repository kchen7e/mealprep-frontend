import _ from "lodash";
import { useState } from "react";
import { Button, Modal, Table, Typography, Row, Col, Empty, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import type { ShoppingListItem, ShoppingListFoodItem, UnitData, WeekMealSelection } from "../../static/Type";
import { queryShoppingList, queryShoppingListFood } from "../../service/BackendAPI";

const { Title } = Typography;

interface ModalShoppingListProps {
  list: WeekMealSelection;
}

function ModalShoppingList({ list }: ModalShoppingListProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ingredientList, setIngredientList] = useState<ShoppingListItem | null>(null);
  const [foodList, setFoodList] = useState<ShoppingListFoodItem[] | null>(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const [data, foodData] = await Promise.all([
          queryShoppingList(list) as Promise<ShoppingListItem | null>,
          queryShoppingListFood(list) as Promise<ShoppingListFoodItem[] | null>,
        ]);
        if (data) {
          sessionStorage.setItem("currentList", JSON.stringify(list));
          setIngredientList(data);
        }
        if (foodData) {
          setFoodList(foodData);
        }
      } catch (error) {
        console.error("Failed to get shopping list:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  interface IngredientTableItem {
    key: number;
    ingredient: string;
    amount: string;
  }

  interface FoodTableItem {
    key: number;
    food: string;
    quantity: string;
    store: string;
    unmatched: boolean;
  }

  function formatAmount(unit: UnitData): string {
    const m = unit.measure;
    const displayMeasure = m === Math.floor(m) ? m.toString() : m.toString();
    return `${displayMeasure} ${unit.type.toLowerCase()}`;
  }

  function formatQuantity(quantity: number, purchaseUnit: string): string {
    const q = quantity;
    // Round to reasonable precision
    const displayQty = Number.isInteger(q) ? q.toString() : q.toFixed(3);
    return `${displayQty} ${purchaseUnit.toLowerCase()}`;
  }

  const ingredientTableData: IngredientTableItem[] = ingredientList
    ? Object.keys(ingredientList).map((key, index) => ({
        key: index,
        ingredient: key,
        amount: formatAmount(ingredientList[key]),
      }))
    : [];

  const foodTableData: FoodTableItem[] = foodList
    ? foodList.map((item, index) => ({
        key: index,
        food: item.displayName,
        quantity: formatQuantity(item.quantity, item.purchaseUnit),
        store: item.foundAt || "—",
        unmatched: item.unmatched,
      }))
    : [];

  const ingredientColumns = [
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

  const foodColumns = [
    {
      title: "Food",
      dataIndex: "food",
      key: "food",
      render: (text: string, record: FoodTableItem) => (
        <span>
          {text}
          {record.unmatched && (
            <Tag color="orange" style={{ marginLeft: 8, fontSize: 10 }}>
              unmatched
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Store",
      dataIndex: "store",
      key: "store",
    },
  ];

  return (
    <>
      <Button
        onClick={getShoppingList}
        icon={<ShoppingCartOutlined />}
        loading={loading}
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
        width={950}
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
                columns={ingredientColumns}
                dataSource={ingredientTableData}
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="No Recipe Selected" />
            )}
          </Col>
          <Col span={12}>
            <Title level={4}>Recommended to buy these in your local store</Title>
            {foodList && foodList.length > 0 ? (
              <Table
                columns={foodColumns}
                dataSource={foodTableData}
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description={loading ? "Loading..." : "No Food Data"} />
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ModalShoppingList;