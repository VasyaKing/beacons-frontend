import {BUILDING_HIDE_PROGRESS, BUILDING_SHOW_PROGRESS} from "./BuildingReducer";

export const progressShow = () => {
    console.log("Start progress");
    return {
        type: BUILDING_SHOW_PROGRESS
    }
};

export const progressHide = () => {
    console.log("End progress");
    return {
        type: BUILDING_HIDE_PROGRESS
    }
};