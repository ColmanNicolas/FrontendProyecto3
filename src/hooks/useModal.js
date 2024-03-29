import { useState } from "react";

const useModal = () => {
    const [isOpen, setOpenModal] = useState(false);

    const openModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return {
        isOpen,
        openModal,
        closeModal
    };
};
export default useModal;