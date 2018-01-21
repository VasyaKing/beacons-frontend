import { combineReducers } from 'redux';
import UserReducer from "./user/UserReducer";
import { reducer as FormReducer } from 'redux-form';
import MenuReducer from "./menu/MenuReducer";
import BuildingReducer from "./building/BuildingReducer";

const coreReducer = combineReducers({
    user: UserReducer,
    form: FormReducer,
    menu: MenuReducer,
    building: BuildingReducer
});

export default coreReducer;