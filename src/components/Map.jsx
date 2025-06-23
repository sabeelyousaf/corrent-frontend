import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const Map = () => {
  const mapStyles = {height: '100%', width: '100%'};
  const defaultCenter = {lat: 51.505, lng: -0.09};

  return (
   <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
