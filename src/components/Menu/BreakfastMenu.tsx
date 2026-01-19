import React from "react";
import { Typography, Flex } from "antd";
import ModalMenu from "./ModalMenu";
import Recipe from "./Recipe";
import { Recipe as RecipeType, WeekMealSelection } from "../../static/Type";

const { Title } = Typography;

interface BreakfastMenuProps {
    day: number;
    recipes: RecipeType[];
    selectedRecipe: string[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function BreakfastMenu({
    day,
    recipes,
    selectedRecipe,
    setSelectedRecipes,
}: BreakfastMenuProps) {
    const renderers = {
        header: () => renderHeader(day),
        body: () => renderBody(recipes, selectedRecipe, setSelectedRecipes, day),
        footer: renderFooter,
    };

    const modalButton = {
        content: "Select Breakfast",
        colour: "orange",
    };

    function renderHeader(day: number) {
        return (
            <>
                <Title level={4}>Day {day}</Title>
                <Title level={3}>Breakfast Menu</Title>
            </>
        );
    }

    function renderBody(
        recipes: RecipeType[],
        selectedRecipe: string[],
        setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>,
        day: number
    ) {
        if (!recipes) return null;

        return (
            <Flex wrap="wrap" gap="middle">
                {recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipeName}
                        recipe={recipe}
                        selectedRecipe={selectedRecipe}
                        setSelectedRecipes={setSelectedRecipes}
                        day={day}
                        meal="breakfast"
                    />
                ))}
            </Flex>
        );
    }

    function renderFooter() {
        return null;
    }

    return <ModalMenu modalButton={modalButton} renderers={renderers} />;
}

export default BreakfastMenu;
