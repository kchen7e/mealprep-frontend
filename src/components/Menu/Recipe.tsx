import React, { useState } from "react";
import { Card, Image, Button, Typography } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import meal from "../../static/meal.jpg";

const { Text } = Typography;

function Recipe(props) {
    const initialStatus = props.selectedRecipe.includes(props.recipe.recipeName);
    const [selected, setStatus] = useState(initialStatus);

    function handleClick() {
        if (selected) {
            const index = props.selectedRecipe.indexOf(props.recipe.recipeName);
            if (index > -1) {
                props.selectedRecipe.splice(index, 1);
            }
        } else {
            props.selectedRecipe.push(props.recipe.recipeName);
        }
        setStatus(!selected);
    }

    return (
        <Card
            hoverable
            onClick={handleClick}
            style={{
                width: 180,
                border: selected ? "2px solid #1890ff" : "1px solid #d9d9d9",
                backgroundColor: selected ? "#e6f7ff" : undefined,
            }}
            cover={<Image alt="recipe" src={meal} preview={false} height={100} style={{ objectFit: "cover" }} />}
            actions={[
                <Button
                    key="select"
                    type={selected ? "primary" : "default"}
                    shape="circle"
                    size="small"
                    icon={selected ? <CheckOutlined /> : <PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                />
            ]}
        >
            <Text strong style={{
                display: "block",
                whiteSpace: "normal",
                wordWrap: "break-word",
                fontSize: "14px",
                lineHeight: "1.3",
                minHeight: "36px",
            }}>
                {props.recipe.displayName}
            </Text>
        </Card>
    );
}

export default Recipe;
