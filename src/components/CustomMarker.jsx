// src/components/CustomMarker.jsx
import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const CustomMarker = ({ position, comment }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMouseOver = () => {
    setShowInfoWindow(true);
  };

  const handleMouseOut = () => {
    setShowInfoWindow(false);
  };

  return (
    <div>
      <Marker
        position={position}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: 'blue',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {showInfoWindow && comment && (
        <InfoWindow position={position}>
          <div
            style={{
              padding: '10px',
              maxWidth: '200px',
            }}
          >
            <p>{comment}</p>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default CustomMarker;
