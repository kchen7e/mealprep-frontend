import React from "react";
import ModalMenu from "./ModalMenu";
import Recipe from "./Recipe";

function BreakfastMenu(props) {
    const renderers = {
        header: renderHeader,
        body: renderBody,
        footer: renderFooter,
    };

    const modalButton = {
        content: "Select Breakfast",
        colour: "orange",
    };

    function renderHeader() {
        return (
            <>
                <h2>Breakfast Menu</h2>
            </>
        );
    }

    function renderBody() {
        const menu = [];
        for (const recipe of props.recipes) {
            menu.push(
                <Recipe
                    key={recipe.recipeName}
                    recipe={recipe}
                    selectedRecipe={props.selectedRecipe}
                />
            );
        }
        const menuWrap = <div className="menuContainer">{menu}</div>;
        return menuWrap;
    }

    function renderFooter() {}

    return (
        <>
            <ModalMenu modalButton={modalButton} renderers={renderers} />
        </>
    );
}

export default BreakfastMenu;
