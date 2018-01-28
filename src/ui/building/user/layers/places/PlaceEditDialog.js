import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, RaisedButton} from "material-ui";
import {withRouter} from "react-router-dom";
import PlacesService from "../../../../../service/PlacesService";
import {progressHide, progressShow} from "../../../../../store/building/BuildingActions";
import {connect} from "react-redux";

class PlaceEditDialog extends Component {
    state = {
        isValid: false,
        place: null,
        dialogTitle: ""
    };

    constructor() {
        super();
        this._handleCancel = this._handleCancel.bind(this);
    }

    componentDidMount = (props) => {
        const { placeId } = this.props;
        const isCreate = placeId === "new";

        this.props.onProgressStart();
        if (isCreate) {
            this.setState({ dialogTitle: "Create new place" });
            PlacesService.createPlace()
                .then(place => {
                    this.setState({
                        place: place
                    });
                    this.props.onProgressEnd();
                });
        } else {
            this.setState({ dialogTitle: "Edit place" });
            PlacesService.findOne(placeId)
                .then(place => {
                    this.setState({
                        place: place
                    });
                    this.props.onProgressEnd();
                })
        }
    };

    _handleSubmit = () => {
        // some submit logic
    };

    _handleCancel = () => {
        // @TODO use navigator
        this.props.history.push(
            "/buildings/" +
            this.props.currentBuildingId + "/levels/" +
            this.props.currentLevelId + "/places/edit"
        );
    };

    render() {
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

PlaceEditDialog.propTypes = {
    onProgressStart: PropTypes.func.isRequired,
    onProgressEnd: PropTypes.func.isRequired,
    placeId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    currentBuildingId: PropTypes.number.isRequired,
    currentLevelId: PropTypes.number.isRequired
};

const mapState = (state, ownProps) => {
    return {
        placeId: ownProps.match.params.placeId,
        currentBuildingId: +ownProps.match.params.buildingId,
        currentLevelId: +ownProps.match.params.levelId
    }
};

const mapDispatch = (dispatch) => {
    return {
        onProgressStart: () => dispatch(progressShow()),
        onProgressEnd: () => dispatch(progressHide())
    };
};

export default withRouter(connect(mapState, mapDispatch)(PlaceEditDialog));