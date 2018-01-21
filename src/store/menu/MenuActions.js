import {MENU_CLOSE, MENU_OPEN} from "./MenuReducer";

export const menuOpen = () => {
    return {
        type: MENU_OPEN
    };
};

export const menuClose = () => {
    return {
        type: MENU_CLOSE
    };
};