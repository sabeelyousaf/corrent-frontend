import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapStyles = { height: '100%', width: '100%' };

  // Combine all markers here
  const locations = [
    // Richmond, Virginia
    { lat: 37.5407, lng: -77.4360, },
    { lat: 37.5483, lng: -77.4520,  },
    
    // Florida cities
    { lat: 25.7617, lng: -80.1918, },
    { lat: 28.4743, lng: -81.4678,  },
    { lat: 27.9506, lng: -82.4572,  },
    { lat: 30.3285, lng: -81.6616,  },
    { lat: 24.5464, lng: -81.7976,  },

    // Denver, Colorado
    { lat: 39.7392, lng: -104.9903, label: 'Denver Downtown' },
    { lat: 39.7589, lng: -105.0076, label: 'Union Station' },
  ];

  const defaultCenter = locations[0]; // Centered on Richmond

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={5} center={defaultCenter}>
        {locations.map((loc, index) => (
          <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} label={loc.label} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
