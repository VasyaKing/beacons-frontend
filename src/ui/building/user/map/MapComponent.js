import React from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

const MapComponent = (props) => {
    const markers = props.markers.map(model => {
        return <Marker key={model.id}
                       position={{ lat: model.lat, lng: model.lng }} />
    });

    return (
        <GoogleMap defaultZoom={8}
                   defaultCenter={{lat: -34.397, lng: 150.644}}>
            {markers}
        </GoogleMap>
    )
};

MapComponent.propTypes = {
    markers: PropTypes.array.isRequired
};

export default withScriptjs(withGoogleMap(MapComponent));