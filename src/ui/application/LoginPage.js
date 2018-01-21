import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {login} from "../../store/user/UserActions";

const LoginPage = (props) => {
    return (
        <div>
            <h1>Login page</h1>
            <button onClick={props.login}>Login</button>
        </div>
    )
};

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => {
    return {
        login: () => dispatch(login())
    };
};

export default connect(mapState, mapDispatch)(LoginPage);