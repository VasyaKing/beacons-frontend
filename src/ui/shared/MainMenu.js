import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Drawer, MenuItem} from "material-ui";
import {connect} from "react-redux";
import {menuClose} from "../../store/menu/MenuActions";
import {withRouter} from "react-router-dom";
import { PAGES } from '../application/ApplicationRouting';

class MainMenu extends Component {
    constructor() {
        super();
        this._handleMenuItemClick = this._handleMenuItemClick.bind(this);
    }

    _handleMenuItemClick = (page) => {
        this.props.onClose();
        this.props.history.push(page.path);
    };

    render() {
        const content = PAGES.map(page => {
            return <MenuItem key={page.key}
                             onClick={() => this._handleMenuItemClick(page)}>
                {page.title}
            </MenuItem>
        });

        return (
            <Drawer open={this.props.isOpen}
                    docked={false}
                    onRequestChange={this.props.onClose}>

                {content}

            </Drawer>
        )
    }
}

MainMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

const mapState = (state) => {
    return {
        isOpen: state.menu.isOpen
    };
};

const mapDispatch = (dispatch) => {
    return {
        onClose: () => dispatch(menuClose())
    };
};

export default withRouter(connect(mapState, mapDispatch)(MainMenu));