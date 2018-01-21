import {USER_LOGIN, USER_SAVE_LAST_LOCATION} from "./UserReducer";

export const login = () => {
    return {
        type: USER_LOGIN
    };
};

export const saveLocation = (location) => {
    return {
        type: USER_SAVE_LAST_LOCATION,
        payload: location
    };
};