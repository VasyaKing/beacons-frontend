import React, {Component} from 'react';
import BuildingService from "../../../service/BuildingService";
import {RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";
import {withRouter} from "react-router-dom";
import ProgressDialog from "../../shared/ProgressDialog";
import BuildingNavigation from "../../../navigation/BuildingNavigation";

class BuildingList extends Component {
    state = {
        isLoading: false,
        currentPage: 0,
        totalPages: 0,
        buildings: []
    };

    constructor(props) {
        super(props);
        this._handleEditBuilding = this._handleEditBuilding.bind(this);
        this._handleShowBuilding = this._handleShowBuilding.bind(this);
    };

    componentDidMount = () => {
        this.setState({ isLoading: true });
        BuildingService.findPage(this.state.currentPage)
            .then(data => {
                this.setState({
                    isLoading: false,
                    buildings: data.items,
                    totalPage: data.totalPages
                });
            });
    };

    _handleEditBuilding = (building) => {
        BuildingNavigation.toBuilding(building)
            .then(url => {
                this.props.history.push(url);
            });
    };

    _handleShowBuilding = (building) => {
        this.setState({ isLoading: true });
        BuildingService.findFirstLevel(building)
            .then(level => {
                this.setState({ isLoading: false });
                BuildingNavigation.toLevel(building, level)
                    .then(url => {
                        this.props.history.push(url);
                    });
            });
    };

    render() {
        if (this.state.isLoading) {
            return <ProgressDialog/>
        }

        const content = this.state.buildings.map(building => {
            return <TableRow key={building.id}>
                <TableRowColumn>{building.id}</TableRowColumn>
                <TableRowColumn>{building.title}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton label="Edit" onClick={() => this._handleEditBuilding(building)} />
                    <RaisedButton label="Show" onClick={() => this._handleShowBuilding(building)} />
                </TableRowColumn>
            </TableRow>
        });

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {content}
                </TableBody>
            </Table>
        )
    }
}

BuildingList.propTypes = {
};

export default withRouter(BuildingList);