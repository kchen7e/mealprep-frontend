import React from "react";
import { Typography, Flex } from "antd";
import ModalMenu from "./ModalMenu";
import Recipe from "./Recipe";

const { Title } = Typography;

function LunchMenu(props) {
    const renderers = {
        header: renderHeader,
        body: renderBody,
        footer: renderFooter,
    };

    const modalButton = {
        content: "Select Lunch",
        colour: "yellow",
    };

    function renderHeader() {
        return (
            <>
                <Title level={4}>Day {props.day}</Title>
                <Title level={3}>Lunch Menu</Title>
            </>
        );
    }

    function renderBody() {
        if (!props.recipes) return null;

        return (
            <Flex wrap="wrap" gap="middle">
                {props.recipes.map((recipe) => (
                    <Recipe
                        key={recipe.recipeName}
                        recipe={recipe}
                        selectedRecipe={props.selectedRecipe}
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
