import React from 'react';
import {CircularProgress, Dialog} from "material-ui";

const ProgressDialog = (props) => {
    return (
        <Dialog open={true} modal={true}>
            <center>
                <CircularProgress size={60} thickness={7} />
            </center>
        </Dialog>
    )
};

ProgressDialog.propTypes = {

};

export default ProgressDialog;