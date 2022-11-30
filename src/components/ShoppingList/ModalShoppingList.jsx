import _ from "lodash";
import React, {useState} from "react";
import Modal from "react-modal";
import {Button, Icon} from "semantic-ui-react";
import {queryShoppingList} from "../../service/BackendAPI";

function ModalShoppingList({list}) {
    Modal.setAppElement("#root");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ingredientList, setingredientList] = useState(false);

    // useEffect(() => {
    // setfinishLoadingMenu(!finishLoadingMenu);
    // }, []);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "blue";
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getShoppingList() {
        openModal();
        const currentList = sessionStorage.getItem("currentList");
        if (currentList) {
            const currentListObj = JSON.parse(currentList);
            if (_.isEqual(currentListObj, list)) {
                return;
            }
        }
        if (!_.isEmpty(list)) {
            queryShoppingList(JSON.stringify(list)).then((data) => {
                if (data) {
                    sessionStorage.setItem("currentList", JSON.stringify(list));
                    setingredientList(data);
                }
            });
        }
    }

    const renderIngredientTable = () => {
        const content = [];
        Object.keys(ingredientList).forEach((key) => {
            content.push(
                <tr>
                    <th>{key}</th>
                    <td>{ingredientList[key]}</td>
                </tr>
            );
        });
        const contentWrap = <table>{content}</table>;
        return contentWrap;
    };

    function renderList() {
        if (ingredientList) {
            return renderIngredientTable();
        } else {
            return <p>No Recipe Selected</p>;
        }
    }

    return (
        <>
            <Button
                basic
                // color="white"
                onClick={getShoppingList}
                style={{marginLeft: 20}}>
                <Icon name="shopping cart" size="large" />
                Get Shopping List
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Menu">
                <div className="modalContainer">
                    <div className="modalHeader">
                        <Icon name="close" size="large" onClick={closeModal} />
                        <h2>Shopping List</h2>
                    </div>
                    <div className="shoppingListContainer">
                        <div className="shoppingListContainerLeftPane">
                            <h2>Your need these Ingredients</h2>
                            {renderList()}
                        </div>
                        <div className="shoppingListContainerRightPane">
                            <h2>
                                Recommended to buy these in your local store
                            </h2>
                        </div>
                    </div>
                    {/* <div className="modalBody">{renderers.body()}</div> */}
                    {/* <div className="modalFooter">{renderers.footer()}</div> */}
                </div>
            </Modal>
        </>
    );
}

export default ModalShoppingList;
