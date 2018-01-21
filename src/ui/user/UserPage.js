import React from 'react';
import {Route} from "react-router-dom";
import UserPageHeader from "./UserPageHeader";
import UserList from "./UserList";
import UserEditDialog from "./UserEditDialog";

const UserPage = (props) => {
    return [
        <UserPageHeader key="header" />,
        <Route path="/users" component={UserList} key="list" />,
        <Route path="/users/:id" component={UserEditDialog} key="dialog" />
    ];
};

UserPage.propTypes = {

};

export default UserPage;