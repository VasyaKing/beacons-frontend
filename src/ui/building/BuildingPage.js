import React from 'react';
import {Route, Switch} from "react-router-dom";
import BuildingAdminPage from "./admin/BuildingAdminPage";
import BuildingUserPage from "./user/BuildingUserPage";

const BuildingPage = (props) => {
    return (
        <Switch>
            <Route exact path="/buildings/:buildingId/levels/:levelId/:layer" component={BuildingUserPage} />
            <Route exact path="/buildings/:id?" component={BuildingAdminPage} />
        </Switch>
    )
};

BuildingPage.propTypes = {

};

export default BuildingPage;