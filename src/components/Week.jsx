import React from "react";
import Day from "./Day";
import {Button, Icon} from "semantic-ui-react";
import {portalClassName} from "react-modal/lib/components/Modal";

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

    function displayAccount() {}

    function getShoppingList() {}

    return (
        <>
            <div className="headerContainer">
                <Button basic color="white" onClick={displayAccount}>
                    <Icon name="home" size="large" />
                    My Account
                </Button>
                <h1>Meal Prep for this Week</h1>
                <Button
                    basic
                    color="white"
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
                        <Day day={i + 1} selectedRecipe={selectedRecipe[i]} />
                    );
                })}
            </div>
        </>
    );
}

export default Week;
