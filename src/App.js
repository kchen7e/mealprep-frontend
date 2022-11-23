import React from "react";
import Week from "./components/Calendar/Week";
import {downloadRecipes} from "./service/BackendAPI";
import "./styles/App.css";

function App() {
    const recipes = downloadRecipes();

    return (
        <>
            <Week recipes={recipes} />
        </>
    );
}

export default App;
