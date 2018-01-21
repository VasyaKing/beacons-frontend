const initialState = {
    isLogged: false,
    lastLocation: ""
};

export const USER_LOGIN = "user_login";
export const USER_SAVE_LAST_LOCATION = "user_save_last_location";

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN: return {
            ...state,
            isLogged: true
        };

        case USER_SAVE_LAST_LOCATION: return {
            ...state,
            lastLocation: action.payload
        };

        default: return state;
    }
};

export default UserReducer;