import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from "material-ui";
import {withRouter} from "react-router-dom";
import {progressHide, progressShow} from "../../../store/building/BuildingActions";
import {connect} from "react-redux";
import BuildingService from "../../../service/BuildingService";
import LevelService from "../../../service/LevelService";
import BuildingNavigation from "../../../navigation/BuildingNavigation";

class BuildingLayerSelector extends Component {
    constructor() {
        super();
        this._handleLayerChange = this._handleLayerChange.bind(this);
    }

    _handleLayerChange = (layer) => {
        this.props.onProgressStart();
        const buildingPromise = BuildingService.findOne(this.props.currentBuildingId);
        const levelPromise = LevelService.findOne(this.props.currentLevelId);
        Promise.all([
            buildingPromise,
            levelPromise
        ]).then(items => {
            BuildingNavigation.toLayer(items[0], items[1], layer)
                .then(url => {
                    this.props.onProgressEnd();
                    this.props.history.push(url);
                });
        });
    };

    render() {
        return [
            <RaisedButton label="Places"
                          primary={this.props.currentLayer === "places"}
                          onClick={() => this._handleLayerChange("places")}
                          key="places" />,
            <RaisedButton label="Beacons"
                          primary={this.props.currentLayer === "beacons"}
                          onClick={() => this._handleLayerChange("beacons")}
                          key="beacons" />,
            <RaisedButton label="Routes"
                          primary={this.props.currentLayer === "routes"}
                          onClick={() => this._handleLayerChange("routes")}
                          key="routes" />,
            <RaisedButton label="Teleports"
                          primary={this.props.currentLayer === "teleports"}
                          onClick={() => this._handleLayerChange("teleports")}
                          key="teleports" />
        ]
    }
}

BuildingLayerSelector.propTypes = {
    currentBuildingId: PropTypes.number.isRequired,
    currentLevelId: PropTypes.number.isRequired,
    currentLayer: PropTypes.string.isRequired,
    onProgressStart: PropTypes.func.isRequired,
    onProgressEnd: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            buildingId: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            levelId: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            layer: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const mapState = (state, ownProps) => {
    return {
        currentBuildingId: +ownProps.match.params.buildingId,
        currentLevelId: +ownProps.match.params.levelId,
        currentLayer: ownProps.match.params.layer
    };
};

const mapActions = (dispatch) => {
    return {
        onProgressStart: () => dispatch(progressShow()),
        onProgressEnd: () => dispatch(progressHide())
    };
};

export default withRouter(connect(mapState, mapActions)(BuildingLayerSelector));