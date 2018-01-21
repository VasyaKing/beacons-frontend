import React, {Component} from 'react';
import UserService from "../../service/UserService";
import {Dialog, RaisedButton} from "material-ui";
import {withRouter} from "react-router-dom";
import ProgressDialog from "../shared/ProgressDialog";
import UserEditForm from "./UserEditForm";

class UserEditDialog extends Component {
    state = {
        isLoading: false,
        isValid: false,
        user: null,
        dialogTitle: ""
    };

    constructor() {
        super();
        this._handleCancel = this._handleCancel.bind(this);
    }

    componentDidMount = (props) => {
        const { id } = this.props.match.params;
        const isCreate = id === "new";

        this.setState({ isLoading: true });
        if (isCreate) {
            this.setState({ dialogTitle: "Create new user" });
            UserService.createUser()
                .then(user => {
                    this.setState({
                        user: user,
                        isLoading: false
                    });
                });
        } else {
            this.setState({ dialogTitle: "Edit user" });
            UserService.findOne(id)
                .then(user => {
                    this.setState({
                        user: user,
                        isLoading: false
                    })
                })
        }
    };

    _handleSubmit = () => {
        // some submit logic
    };

    _handleCancel = () => {
        this.props.history.push("/users");
    };

    render() {
        if (this.state.isLoading) {
            return <ProgressDialog/>
        }

        const actions = [
            <RaisedButton label="Cancel"
                          onClick={this._handleCancel} />,
            <RaisedButton label="Submit" disabled={!this.state.isValid} />
        ];

        return (
            <Dialog title={this.state.dialogTitle}
                    open={true}
                    actions={actions}>

                <UserEditForm />

            </Dialog>
        )
    }
}

UserEditDialog.propTypes = {
};

export default withRouter(UserEditDialog);