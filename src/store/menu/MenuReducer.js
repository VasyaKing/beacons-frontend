const initialState = {
    isOpen: false
};

export const MENU_OPEN = "menu_open";
export const MENU_CLOSE = "menu_close";

const MenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_OPEN: return {
            ...state,
            isOpen: true
        };

        case MENU_CLOSE: return {
            ...state,
            isOpen: false
        };

        default: return state;
    }
};

export default MenuReducer;