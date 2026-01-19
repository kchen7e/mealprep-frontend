import { useEffect, useState } from "react";
import { Button, Modal } from "antd";

// Semantic UI color mapping
const colorMap: Record<string, { bg: string; border: string; hover: string }> = {
    orange: { bg: "#F2711C", border: "#F2711C", hover: "#e8590c" },
    yellow: { bg: "#FBBD08", border: "#FBBD08", hover: "#eaae00" },
    olive: { bg: "#B5CC18", border: "#B5CC18", hover: "#a7bd0d" },
};

interface ModalButton {
    content: string;
    colour: string;
}

interface Renderers {
    header: () => React.ReactNode;
    body: () => React.ReactNode;
    footer: () => React.ReactNode;
}

interface ModalButton {
    content: string;
    colour: string;
}

interface Renderers {
    header: () => React.ReactNode;
    body: () => React.ReactNode;
    footer: () => React.ReactNode;
}

interface ModalMenuProps {
    modalButton: ModalButton;
    renderers: Renderers;
}

function ModalMenu({ modalButton, renderers }: ModalMenuProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [finishLoadingMenu, setfinishLoadingMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const colors = colorMap[modalButton.colour] || colorMap.yellow;

    useEffect(() => {
        setfinishLoadingMenu(true);
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <Button
                onClick={openModal}
                disabled={!finishLoadingMenu}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor: isHovered ? colors.hover : colors.bg,
                    borderColor: colors.border,
                    color: "#fff",
                    fontWeight: 600,
                }}
            >
                {modalButton.content}
            </Button>
            <Modal
                title={renderers.header()}
                open={modalIsOpen}
                onCancel={closeModal}
                footer={renderers.footer()}
                width={800}
                styles={{ body: { maxHeight: "60vh", overflowY: "auto" } }}
                getContainer={() => document.getElementById("root") || document.body}
            >
                {renderers.body()}
            </Modal>
        </>
    );
}

export default ModalMenu;
