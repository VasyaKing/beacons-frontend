import React from 'react';
import BuildingLayerSelector from "./BuildingLayerSelector";
import {Route} from "react-router-dom";
import PlacesLayer from "./layers/places/PlacesLayer";
import BeaconsLayer from "./layers/beacons/BeaconsLayer";
import RoutesLayer from "./layers/routes/RoutesLayer";
import TeleportsLayer from "./layers/teleports/TeleportsLayer";

const BuildingLevelMap = (props) => {
    return [
        <BuildingLayerSelector key="layers" />,
        <Route path="/buildings/:buildingId/levels/:levelId/places"
               component={PlacesLayer}
               key="places" />,
        <Route path="/buildings/:buildingId/levels/:levelId/beacons"
               component={BeaconsLayer}
               key="beacons" />,
        <Route path="/buildings/:buildingId/levels/:levelId/routes"
               component={RoutesLayer}
               key="routes" />,
        <Route path="/buildings/:buildingId/levels/:levelId/teleports"
               component={TeleportsLayer}
               key="teleports" />
    ]
};

BuildingLevelMap.propTypes = {

};

export default BuildingLevelMap;