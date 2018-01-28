import React from 'react';
import PropTypes from 'prop-types';
import LayerBase from "../LayerBase";
import PlacesService from "../../../../../service/PlacesService";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {RaisedButton} from "material-ui";

class PlacesLayer extends LayerBase {
    static getMarkers = (building, level) => {
        return PlacesService.findAll(building, level);
    };

    constructor() {
        super();
        this._switchToEditMode = this._switchToEditMode.bind(this);
        this._switchToReadMode = this._switchToReadMode.bind(this);
    }

    _switchToEditMode = () => {
        // @TODO, use Navigator
        this.props.history.push(
            "/buildings/" +
            this.props.currentBuildingId +
            "/levels/" +
            this.props.currentLevelId +
            "/places/edit"
        );
    };
    _switchToReadMode = () => {
        // @TODO, use Navigator
        this.props.history.push(
            "/buildings/" +
            this.props.currentBuildingId +
            "/levels/" +
            this.props.currentLevelId +
            "/places"
        );
    };

    render = () => {
        const actions = [];
        if (!this.props.isEditMode) {
            actions.push(<RaisedButton label="To edit mode"
                                       onClick={this._switchToEditMode}
                                       key="edit_mode"/>);
        } else {
            actions.push(<RaisedButton label="To read mode"
                                       onClick={this._switchToReadMode}
                                       key="read_mode" />);
        }

        return [
            actions
        ]
    }
}

PlacesLayer.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    currentBuildingId: PropTypes.number.isRequired,
    currentLevelId: PropTypes.number.isRequired
};

const mapState = (state, ownProps) => {
    return {
        isEditMode: ownProps.match.params.mode === "edit",
        currentBuildingId: +ownProps.match.params.buildingId,
        currentLevelId: +ownProps.match.params.levelId
    };
};

const mapDispatch = (dispatch) => {
    return {};
};

export default withRouter(connect(mapState, mapDispatch)(PlacesLayer));