import React, {useEffect, useRef, useState} from "react";
import {Button, Icon} from "semantic-ui-react";
import Day from "./Day";
import Account from "../Account/Account";
import ModalShoppingList from "../ShoppingList/ModalShoppingList";
import {getRecipes} from "../../service/RecipeService";
import {defaultRecipeData} from "../../static/static";
import {queryShoppingList} from "../../service/BackendAPI";

function Week() {
    const initialSelection = {
        0: {breakfast: [], lunch: [], dinner: []},
        1: {breakfast: [], lunch: [], dinner: []},
        2: {breakfast: [], lunch: [], dinner: []},
        3: {breakfast: [], lunch: [], dinner: []},
        4: {breakfast: [], lunch: [], dinner: []},
        5: {breakfast: [], lunch: [], dinner: []},
        6: {breakfast: [], lunch: [], dinner: []},
    };

    const selectedRecipes = useRef(initialSelection);
    const getInitialRecipeData = () => {
        if (
            localStorage.getItem("recipeData") &&
            JSON.parse(localStorage.getItem("recipeData")).data
        ) {
            return JSON.parse(localStorage.getItem("recipeData"));
        } else {
            return defaultRecipeData;
        }
    };
    const initialRecipeData = getInitialRecipeData();
    const [recipeData, setRecipeData] = useState(initialRecipeData);

    useEffect(() => {
        getRecipes(recipeData).then((result) => {
            localStorage.removeItem("recipeData");
            localStorage.setItem("recipeData", JSON.stringify(result));
            setRecipeData({
                ...recipeData,
                data: result.data,
                lastRetrieval: result.lastRetrieval,
            });
        });
    }, []);

    return (
        <>
            <div className="headerContainer">
                <Account />
                <h1>Meal Prep for this Week</h1>
                <ModalShoppingList list={selectedRecipes.current} />
            </div>
            <div className="weekContainer">
                {[...Array(7)].map((_, i) => {
                    return (
                        <Day
                            key={i}
                            day={i + 1}
                            selectedRecipe={selectedRecipes.current[i]}
                            recipes={recipeData.data}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Week;
