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
    state = {
        currentLayer: "",
        currentBuildingId: 0,
        currentLevelId: 0
    };

    constructor() {
        super();
        this._handleLayerChange = this._handleLayerChange.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            currentLayer: this.props.match.params.layer,
            currentBuildingId: +this.props.match.params.buildingId,
            currentLevelId: +this.props.match.params.levelId
        });
    };

    _handleLayerChange = (layer) => {
        this.props.onProgressStart();
        const buildingPromise = BuildingService.findOne(this.state.currentBuildingId);
        const levelPromise = LevelService.findOne(this.state.currentLevelId);
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
                          primary={this.state.currentLayer === "places"}
                          onClick={() => this._handleLayerChange("places")}
                          key="places" />,
            <RaisedButton label="Beacons"
                          primary={this.state.currentLayer === "beacons"}
                          onClick={() => this._handleLayerChange("beacons")}
                          key="beacons" />,
            <RaisedButton label="Routes"
                          primary={this.state.currentLayer === "routes"}
                          onClick={() => this._handleLayerChange("routes")}
                          key="routes" />,
            <RaisedButton label="Teleports"
                          primary={this.state.currentLayer === "teleports"}
                          onClick={() => this._handleLayerChange("teleports")}
                          key="teleports" />
        ]
    }
}

BuildingLayerSelector.propTypes = {
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
            ]).isRequired
        }).isRequired
    }).isRequired
};

const mapState = (state) => {
    return {};
};

const mapActions = (dispatch) => {
    return {
        onProgressStart: () => dispatch(progressShow()),
        onProgressEnd: () => dispatch(progressHide())
    };
};

export default withRouter(connect(mapState, mapActions)(BuildingLayerSelector));