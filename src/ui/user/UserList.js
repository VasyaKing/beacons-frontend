import React, {Component} from 'react';
import UserService from "../../service/UserService";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {withRouter} from "react-router-dom";
import ProgressDialog from "../shared/ProgressDialog";

class UserList extends Component {
    state = {
        isLoading: false,
        currentPage: 0,
        totalPages: 0,
        users: []
    };

    constructor(props) {
        super(props);
        this._handleRowSelection = this._handleRowSelection.bind(this);
    };

    componentDidMount = () => {
        this.setState({ isLoading: true });
        UserService.findPage(this.state.currentPage)
            .then(data => {
                this.setState({
                    isLoading: false,
                    users: data.items,
                    totalPage: data.totalPages
                });
            });
    };

    _handleRowSelection = (rowIndex) => {
        const selectedUser = this.state.users[rowIndex];
        this.props.history.push("/users/" + selectedUser.id);
    };

    render() {
        if (this.state.isLoading) {
            return <ProgressDialog/>
        }

        const content = this.state.users.map(user => {
            return <TableRow key={user.id}>
                <TableRowColumn>{user.id}</TableRowColumn>
                <TableRowColumn>{user.login}</TableRowColumn>
            </TableRow>
        });

        return (
            <Table onRowSelection={this._handleRowSelection}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Login</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {content}
                </TableBody>
            </Table>
        )
    }
}

UserList.propTypes = {
};

export default withRouter(UserList);