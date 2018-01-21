import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {IconButton, RaisedButton, Toolbar, ToolbarGroup, ToolbarTitle} from "material-ui";
import {withRouter} from "react-router-dom";
import List from 'material-ui/svg-icons/action/list'
import {menuOpen} from "../../store/menu/MenuActions";
import {connect} from "react-redux";

class UserPageHeader extends Component {
    constructor() {
        super();
        this._handleCreateNewUser = this._handleCreateNewUser.bind(this);
    }

    _handleCreateNewUser = () => {
        this.props.history.push("/users/new");
    };

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <IconButton onClick={this.props.onOpen}>
                        <List/>
                    </IconButton>
                    <ToolbarTitle text="Users"/>
                    <RaisedButton label="Create user" onClick={this._handleCreateNewUser} />
                </ToolbarGroup>
                <ToolbarGroup>

                </ToolbarGroup>
            </Toolbar>
        )
    }
}

UserPageHeader.propTypes = {
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

export default withRouter(connect(mapState, mapActions)(UserPageHeader));