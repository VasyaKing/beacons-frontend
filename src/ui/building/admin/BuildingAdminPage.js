import React from 'react';
import BuildingPageHeader from "./BuildingPageHeader";
import BuildingList from "./BuildingList";
import {Route} from "react-router-dom";
import BuildingEditDialog from "./BuildingEditDialog";

const BuildingAdminPage = (props) => {
    return [
        <BuildingPageHeader key="header" />,
        <Route path="/buildings" component={BuildingList} key="list" />,
        <Route path="/buildings/:id" component={BuildingEditDialog} key="dialog" />
    ]
};

BuildingAdminPage.propTypes = {

};

export default BuildingAdminPage;