import React from 'react';

import coreReducer from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {createStore} from 'redux';
import {Provider} from "react-redux";
import ApplicationNavigation from "./ui/application/ApplicationNavigation";

const store = createStore(coreReducer);

const App = (props) => {
    return (
        <Provider store={store}>
            <Router>
                <Route component={ApplicationNavigation} />
            </Router>
        </Provider>
    )
};

App.propTypes = {

};

export default App;