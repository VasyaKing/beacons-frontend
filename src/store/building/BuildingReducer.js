const initialState = {
    progressCounter: 0
};

export const BUILDING_SHOW_PROGRESS = "building_show_progress";
export const BUILDING_HIDE_PROGRESS = "building_hide_progress";

const BuildingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUILDING_SHOW_PROGRESS: return {
            ...state,
            progressCounter: state.progressCounter + 1
        };

        case BUILDING_HIDE_PROGRESS: return {
            ...state,
            progressCounter: state.progressCounter - 1
        };

        default: return state;
    }
};

export default BuildingReducer;