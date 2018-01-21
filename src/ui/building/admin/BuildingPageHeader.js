import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {menuOpen} from "../../../store/menu/MenuActions";
import {withRouter} from "react-router-dom";
import List from 'material-ui/svg-icons/action/list'
import {IconButton, RaisedButton, Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui";
import BuildingNavigation from "../../../navigation/BuildingNavigation";

class BuildingPageHeader extends Component {
    constructor() {
        super();
        this._handleCreateNewBuilding = this._handleCreateNewBuilding.bind(this);
    }

    _handleCreateNewBuilding = () => {
        BuildingNavigation.toNew()
            .then(url => {
                this.props.history.push(url);
            });
    };

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <IconButton onClick={this.props.onOpen}>
                        <List/>
                    </IconButton>
                    <ToolbarTitle text="Buildings"/>
                    <RaisedButton label="Create building" onClick={this._handleCreateNewBuilding} />
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

BuildingPageHeader.propTypes = {
    onOpen: PropTypes.func.isRequired
};

const mapState = (state) => {
    return {};
};

const mapActions = (dispatch) => {
    return {
        onOpen: () => dispatch(menuOpen())
    };
};

export default withRouter(connect(mapState, mapActions)(BuildingPageHeader));