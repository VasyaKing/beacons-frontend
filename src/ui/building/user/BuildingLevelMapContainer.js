import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapComponent from "./map/MapComponent";
import {withRouter} from "react-router-dom";
import LayerUtils from "./layers/LayerUtils";
import {connect} from "react-redux";
import {progressHide, progressShow} from "../../../store/building/BuildingActions";
import BuildingService from "../../../service/BuildingService";
import LevelService from "../../../service/LevelService";

class BuildingLevelMapContainer extends Component {
    state = {
        markers: []
    };

    componentDidMount = () => {
        this._updateMarkers();
    };

    componentWillReceiveProps = (newProps) => {
        if (this.props.currentLevelId === newProps.currentLevelId
            && this.props.currentBuildingId === newProps.currentBuildingId
            && this.props.currentLayer === newProps.currentLayer) {

            // do nothing
            return;
        }
        this._updateMarkers();
    };

    _updateMarkers = () => {
        this.props.onProgressStart();
        const currentLayer = this._getCurrentLayer();
        const buildingPromise = BuildingService.findOne(this.props.currentBuildingId);
        const levelPromise = LevelService.findOne(this.props.currentLevelId);
        Promise.all([buildingPromise, levelPromise])
            .then(([building, level]) => {
                currentLayer.getMarkers(building, level)
                    .then(markers => {
                        this.setState({
                            markers: markers
                        });
                        this.props.onProgressEnd();
                    });
            });
    };

    _getCurrentLayer = () => {
        const { children, currentPath } = this.props;
        for (var i = 0; i < children.length; i++) {
            const child = children[i];
            const childPath = child.props.path;
            if (LayerUtils.matches(currentPath, childPath)) {
                return child.props.component; // @TODO, dirty hack
            }
        }
        alert("Can't find layer for path " + currentPath);
    };

    render() {
        const url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=" +
            "geometry,drawing,places" +
            "&key=AIzaSyBNSdHYg0bjlANToUtpk3_rJNRfs2Ota_I";
        return [
            this.props.children,
            <MapComponent key="map"
                          loadingElement={<div style={{ height: '100%' }} />}
                          containerElement={<div style={{ height: '600px' }} />}
                          googleMapURL={url}
                          markers={this.state.markers}
                          mapElement={<div style={{ height: `100%` }} />}
            />
        ]
    }
}

BuildingLevelMapContainer.propTypes = {
    onProgressStart: PropTypes.func.isRequired,
    onProgressEnd: PropTypes.func.isRequired,
    children: PropTypes.array.isRequired,
    currentPath: PropTypes.string.isRequired,
    currentBuildingId: PropTypes.number.isRequired,
    currentLevelId: PropTypes.number.isRequired,
    currentLayer: PropTypes.string.isRequired
};

const mapState = (state, ownProps) => {
    return {
        children: ownProps.children,
        currentPath: ownProps.match.url,
        currentBuildingId: +ownProps.match.params.buildingId,
        currentLevelId: +ownProps.match.params.levelId,
        currentLayer: ownProps.match.params.layer
    }
};

const mapDispatch = (dispatch) => {
    return {
        onProgressStart: () => dispatch(progressShow()),
        onProgressEnd: () => dispatch(progressHide())
    };
};

export default withRouter(connect(mapState, mapDispatch)(BuildingLevelMapContainer));