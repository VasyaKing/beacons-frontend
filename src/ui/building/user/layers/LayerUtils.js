import {matchPath} from "react-router-dom";

const LayerUtils = {};

LayerUtils.matches = (url, pattern) => {
    return matchPath(url, {
        path: pattern
    });
};

export default LayerUtils;