import { useState } from "react";
import { Card, Image, Button, Typography } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import type { Recipe, RecipeRef, WeekMealSelection, MealType, DayMealSelection } from "../../static/Type";
import { BACKEND_BASE } from "../../service/BackendAPI";

const { Text } = Typography;

function getRecipeImage(recipeName: string): string {
    return `${BACKEND_BASE}/api/recipe/${encodeURIComponent(recipeName)}/image`;
}

interface RecipeProps {
    recipe: Recipe;
    selectedRecipe: RecipeRef[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
    day: number;
    meal: MealType;
}

// 3. Component name remains Recipe; types use import type, so no conflict
function Recipe({
    recipe,
    selectedRecipe,
    setSelectedRecipes,
    day,
    meal, // No longer conflicts with image variable; TS can correctly identify usage
}: RecipeProps) {
    const initialStatus = selectedRecipe.some((r) => r.recipeName === recipe.recipeName);
    const [selected, setSelected] = useState(initialStatus);

    const handleClick = () => {
        setSelectedRecipes((prevSelectedRecipes) => {
            const dayIndex = Math.max(0, Math.min(6, day - 1)) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
            const newWeekSelection: WeekMealSelection = { ...prevSelectedRecipes };
            const newDaySelection: DayMealSelection = { ...newWeekSelection[dayIndex] };
            const newMealRecipes = [...newDaySelection[meal]]; // props.meal is used correctly

            if (selected) {
                const recipeIndex = newMealRecipes.findIndex((r) => r.recipeName === recipe.recipeName);
                if (recipeIndex > -1) {
                    newMealRecipes.splice(recipeIndex, 1);
                }
            } else {
                if (!newMealRecipes.some((r) => r.recipeName === recipe.recipeName)) {
                    newMealRecipes.push({ recipeName: recipe.recipeName, displayName: recipe.displayName });
                }
            }

            newDaySelection[meal] = newMealRecipes; // props.meal is used correctly
            newWeekSelection[dayIndex] = newDaySelection;

            return newWeekSelection;
        });

        setSelected((prev) => !prev);
    };

    return (
        <Card
            hoverable
            onClick={handleClick}
            style={{
                width: 180,
                border: selected ? "2px solid #1890ff" : "1px solid #d9d9d9",
                backgroundColor: selected ? "#e6f7ff" : undefined,
            }}
            cover={
                <Image
                    alt={recipe.displayName}
                    src={getRecipeImage(recipe.recipeName)}
                    preview={false}
                    height={100}
                    style={{ objectFit: "cover" }}
                />
            }
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
                />,
            ]}
        >
            <Text
                strong
                style={{
                    display: "block",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    fontSize: "14px",
                    lineHeight: "1.3",
                    minHeight: "36px",
                }}
            >
                {recipe.displayName}
            </Text>
        </Card>
    );
}

export default Recipe;