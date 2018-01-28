import React from 'react';

class LayerBase extends React.Component {
    static getMarkers = (building, level) => {
        alert("Function getMarkers is not declared in layer class");
        // it should looks in the following way:
        return new Promise(resolve => {
            debugger;
        });
    };

    static onMarkerClick = (marker) => {
        alert("Function onMarkerClick is not declared in layer class");
    };
}

export default LayerBase;