import React from 'react';
import {MuiThemeProvider} from "material-ui";
import {Route} from "react-router-dom";
import UserPage from "../user/UserPage";
import MainMenu from "../shared/MainMenu";
import BuildingPage from "../building/BuildingPage";

export const PAGES = [
    {
        key: "users",
        path: "/users",
        component: UserPage,
        title: "Users"
    },
    {
        key: "buildings",
        path: "/buildings",
        title: "Buildings",
        component: BuildingPage
    }
];

const ApplicationRouting = (props) => {
    const pages = PAGES.map(page => {
        return <Route path={page.path}
                      component={page.component}
                      key={page.key} />
    });

    return (
        <MuiThemeProvider>
            <div>
                {pages}
                <MainMenu/>
            </div>
        </MuiThemeProvider>
    )
};

ApplicationRouting.propTypes = {

};

export default ApplicationRouting;