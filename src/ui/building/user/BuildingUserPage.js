import React from 'react';
import PropTypes from 'prop-types';
import BuildingPageHeader from "./BuildingPageHeader";
import {connect} from "react-redux";
import ProgressDialog from "../../shared/ProgressDialog";
import BuildingLevelMap from "./BuildingLevelMap";
import {Route} from "react-router-dom";

const BuildingUserPage = (props) => {
    const progressor = props.showProgress ?
        <ProgressDialog key="progressor" /> : null;

    return [
        <Route path="" component={BuildingPageHeader} key="header" />,
        <BuildingLevelMap key="map"/>,
        progressor
    ]
};

BuildingUserPage.propTypes = {
    showProgress: PropTypes.bool.isRequired
};

const mapState = (state) => {
    return {
        showProgress: state.building.progressCounter > 0
    };
};

export default connect(mapState)(BuildingUserPage);