import React, {Component} from 'react';
import {Dialog, RaisedButton} from "material-ui";
import {withRouter} from "react-router-dom";
import ProgressDialog from "../../shared/ProgressDialog";
import BuildingService from "../../../service/BuildingService";

class BuildingEditDialog extends Component {
    state = {
        isLoading: false,
        isValid: false,
        building: null,
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
            this.setState({ dialogTitle: "Create new building" });
            BuildingService.createBuilding()
                .then(building => {
                    this.setState({
                        building: building,
                        isLoading: false
                    });
                });
        } else {
            this.setState({ dialogTitle: "Edit building" });
            BuildingService.findOne(id)
                .then(building => {
                    this.setState({
                        building: building,
                        isLoading: false
                    })
                })
        }
    };

    _handleSubmit = () => {
        // some submit logic
    };

    _handleCancel = () => {
        this.props.history.push("/buildings");
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

                Dialog content

            </Dialog>
        )
    }
}

BuildingEditDialog.propTypes = {
};

export default withRouter(BuildingEditDialog);