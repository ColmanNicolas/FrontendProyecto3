import { useState } from "react";

const useNavbarAdmin = () => {
    const [isOpen, setNavbarActive] = useState(false);

    const changeNavbarState = () => {
        setNavbarActive(!isOpen);
    };
    const setNavbarState = (boolen) => {
        setNavbarActive(boolen);
    };

    return {
        isOpen,
        changeNavbarState,
        setNavbarState
    };
};
export default useNavbarAdmin;