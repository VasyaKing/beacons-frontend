import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import LoginPage from "./LoginPage";
import ApplicationRouting from "./ApplicationRouting";
import {connect} from "react-redux";
import {saveLocation} from "../../store/user/UserActions";

const LOGIN_URL = "/login";
const INITIAL_URL = "/users"; // this URL should be calculated

const ApplicationNavigation = (props) => {
    const { isLogged, saveLastPage, lastLocation } = props;
    const isLoginPage = props.location.pathname === LOGIN_URL;

    if (isLogged && isLoginPage) {
        if (!lastLocation || lastLocation.length === 0) {
            return <Redirect to={INITIAL_URL} />
        } else {
            return <Redirect to={lastLocation} />
        }
    } else if (isLogged) {
        return <ApplicationRouting />;
    } else if (isLoginPage) {
        return <LoginPage />;
    } else {
        saveLastPage(props.location.pathname);
        return <Redirect to={LOGIN_URL}/>
    }
};

ApplicationNavigation.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    saveLastPage: PropTypes.func.isRequired,
    lastLocation: PropTypes.string.isRequired
};

const mapState = (state) => {
    return {
        isLogged: state.user.isLogged,
        lastLocation: state.user.lastLocation
    };
};

const mapActions = (dispatch) => {
    return {
        saveLastPage: (page) => dispatch(saveLocation(page))
    }
};

export default connect(mapState, mapActions)(ApplicationNavigation);