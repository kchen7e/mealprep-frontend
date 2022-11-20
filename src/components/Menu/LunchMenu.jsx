import React from "react";
import ModalMenu from "./ModalMenu";
import Recipe from "./Recipe";

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
                <h2>Lunch Menu</h2>
            </>
        );
    }

    function renderBody() {
        const menu = [];
        for (let i = 0; i < 50; i++) {
            menu.push(<Recipe key={i} />);
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

export default LunchMenu;
