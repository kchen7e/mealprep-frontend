import React from "react";
import Day from "./Day";
import Account from "../Account/Account";
import {Button, Icon} from "semantic-ui-react";

function Week() {
    const selectedRecipe = {
        0: {breakfast: "", lunch: "", dinner: ""},
        1: {breakfast: "", lunch: "", dinner: ""},
        2: {breakfast: "", lunch: "", dinner: ""},
        3: {breakfast: "", lunch: "", dinner: ""},
        4: {breakfast: "", lunch: "", dinner: ""},
        5: {breakfast: "", lunch: "", dinner: ""},
        6: {breakfast: "", lunch: "", dinner: ""},
    };

    function getShoppingList() {
        console.log("shopping list");
    }

    return (
        <>
            <div className="headerContainer">
                <Account />
                <h1>Meal Prep for this Week</h1>
                <Button
                    basic
                    // color="white"
                    onClick={getShoppingList}
                    style={{marginLeft: 20}}
                >
                    <Icon name="shopping cart" size="large" />
                    Get Shopping List
                </Button>
            </div>
            <div className="weekContainer">
                {[...Array(7)].map((_, i) => {
                    return (
                        <Day
                            key={i}
                            day={i + 1}
                            selectedRecipe={selectedRecipe[i]}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Week;
