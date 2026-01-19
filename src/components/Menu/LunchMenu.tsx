import React from "react";
import { Typography, Flex } from "antd";
import ModalMenu from "./ModalMenu";
import Recipe from "./Recipe";
import { Recipe as RecipeType, WeekMealSelection } from "../../static/Type";

const { Title } = Typography;

interface LunchMenuProps {
    day: number;
    recipes: RecipeType[];
    selectedRecipe: string[];
    setSelectedRecipes: React.Dispatch<React.SetStateAction<WeekMealSelection>>;
}

function LunchMenu({
    day,
    recipes,
    selectedRecipe,
    setSelectedRecipes,
}: LunchMenuProps) {
    const renderers = {
        header: () => renderHeader(day),
        body: () => renderBody(recipes, selectedRecipe, setSelectedRecipes, day),
        footer: renderFooter,
    };

    const modalButton = {
        content: "Select Lunch",
        colour: "yellow",
    };

    function renderHeader(day: number) {
        return (
            <>
                <Title level={4}>Day {day}</Title>
                <Title level={3}>Lunch Menu</Title>
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
                        meal="lunch"
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

export default LunchMenu;
