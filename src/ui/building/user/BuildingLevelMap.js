import React from 'react';
import BuildingLayerSelector from "./BuildingLayerSelector";
import BuildingLevelMapContainer from "./BuildingLevelMapContainer";
import {Route} from "react-router-dom";
import PlacesLayer from "./layers/places/PlacesLayer";
import BeaconsLayer from "./layers/beacons/BeaconsLayer";
import RoutesLayer from "./layers/routes/RoutesLayer";
import TeleportsLayer from "./layers/teleports/TeleportsLayer";

const BuildingLevelMap = (props) => {
    return [
        <BuildingLayerSelector key="layers" />,
        <BuildingLevelMapContainer key="map">
            <Route path="/buildings/:buildingId/levels/:levelId/places/:mode?/:placeId?"
                   component={PlacesLayer}
                   key="places" />
            <Route path="/buildings/:buildingId/levels/:levelId/beacons/:mode?/:beaconId?"
                   component={BeaconsLayer}
                   key="beacons" />
            <Route path="/buildings/:buildingId/levels/:levelId/routes/:mode?/:routeId?"
                   component={RoutesLayer}
                   key="routes" />
            <Route path="/buildings/:buildingId/levels/:levelId/teleports/:mode?/:teleportId?"
                   component={TeleportsLayer}
                   key="teleports" />
        </BuildingLevelMapContainer>
    ]
};

BuildingLevelMap.propTypes = {

};

export default BuildingLevelMap;