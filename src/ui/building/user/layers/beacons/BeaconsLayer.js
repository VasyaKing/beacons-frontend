import React from 'react';
import LayerBase from "../LayerBase";
import BeaconsService from "../../../../../service/BeaconsService";

class BeaconsLayer extends LayerBase {
    static getMarkers = (building, level) => {
        return BeaconsService.findAll(building, level);
    };

    render() {
        return (
            <div></div>
        )
    }
}

BeaconsLayer.propTypes = {
};

export default BeaconsLayer;