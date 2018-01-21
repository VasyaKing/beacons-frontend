import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {menuOpen} from "../../../store/menu/MenuActions";
import {withRouter} from "react-router-dom";
import List from 'material-ui/svg-icons/action/list'
import {DropDownMenu, IconButton, MenuItem, Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui";
import BuildingService from "../../../service/BuildingService";
import BuildingNavigation from "../../../navigation/BuildingNavigation";
import {progressHide, progressShow} from "../../../store/building/BuildingActions";

class BuildingPageHeader extends Component {
    state = {
        currentBuildingId: 0,
        buildingToolbarLoaded: false,
        buildingList: []
    };

    constructor() {
        super();
        this._handleSelectBuilding = this._handleSelectBuilding.bind(this);
    }

    componentDidMount = () => {
        this.props.onProgressStart();
        this.setState({
            currentBuildingId: +this.props.match.params.buildingId,
            buildingToolbarLoaded: false
        });
        BuildingService.findAll()
            .then(buildings => {
                this.setState({
                    buildingList: buildings.map(building => {
                        return <MenuItem value={building.id}
                                         key={building.id}
                                         primaryText={building.title} />
                    }),
                    buildingToolbarLoaded: true
                });
                this.props.onProgressEnd();
            });
    };

    _handleSelectBuilding = (event, index, buildingId) => {
        this.props.onProgressStart();
        BuildingService.findOne(buildingId)
            .then(building => {
                BuildingService.findFirstLevel(building)
                    .then(level => {
                        BuildingNavigation.toLevel(building, level)
                            .then(url => {
                                this.props.onProgressEnd();
                                this.props.history.push(url);
                            })
                    });
            });
    };

    render() {
        return (
            <Toolbar key="toolbar">
                <ToolbarGroup>
                    <IconButton onClick={this.props.onOpen}>
                        <List/>
                    </IconButton>
                    <ToolbarTitle text="Buildings"/>
                    <DropDownMenu value={this.state.currentBuildingId}
                                  disabled={!this.state.buildingToolbarLoaded}
                                  onChange={this._handleSelectBuilding}>
                        {this.state.buildingList}
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

BuildingPageHeader.propTypes = {
    onOpen: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            buildingId: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired
        }).isRequired
    }).isRequired,
    onProgressStart: PropTypes.func.isRequired,
    onProgressEnd: PropTypes.func.isRequired
};

const mapState = (state) => {
    return {};
};

const mapActions = (dispatch) => {
    return {
        onOpen: () => dispatch(menuOpen()),
        onProgressStart: () => dispatch(progressShow()),
        onProgressEnd: () => dispatch(progressHide())
    };
};

export default withRouter(connect(mapState, mapActions)(BuildingPageHeader));