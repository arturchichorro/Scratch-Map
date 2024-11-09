import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const CustomMarker = ({ position, title, comment, onDelete }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false); // State to control the InfoWindow visibility

  // Toggle InfoWindow visibility on marker click
  const handleMarkerClick = () => {
    setShowInfoWindow((prev) => !prev);
  };

  // Generate Google Maps URL from the position
  const googleMapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

  return (
    <div>
      <Marker
        position={position} // Google Maps expects the position as lat/lng
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6, // Size of the circle
          fillColor: 'blue',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
        onClick={handleMarkerClick} // Toggle InfoWindow on click
      />
      {showInfoWindow && (title || comment) && (
        <InfoWindow position={position} onCloseClick={handleMarkerClick}>
          <div
            style={{
              padding: '10px',
              maxWidth: '200px',
            }}
          >
            {title && (
              <h4 style={{ fontSize: '18px', margin: '0 0 5px 0' }}>{title}</h4> // Title with larger font
            )}
            {comment && (
              <p style={{ fontSize: '14px', margin: '5px 0' }}>{comment}</p> // Comment with smaller font
            )}
            {position && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#007bff', textDecoration: 'none' }} // Google Maps link in smaller font
              >
                Open in Google Maps
              </a>
            )}
            {/* Delete Button */}
            <button
              onClick={onDelete}
              style={{
                marginTop: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default CustomMarker;
