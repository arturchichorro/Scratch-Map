// src/components/MapComponent.jsx
import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './CustomMarker'; // Import the custom marker component

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

function MapComponent() {
  const [markers, setMarkers] = useState([]); // State to store marker positions and comments
  const [comment, setComment] = useState(''); // State to store current comment input
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null); // Track which marker is being commented on

  // Function to handle clicks on the map
  const handleMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      comment: '', // Initially no comment for the new marker
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarkerIndex(markers.length); // Set the active marker for comment input
  }, [markers]);

  // Function to handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Function to save the comment
  const handleSaveComment = () => {
    if (activeMarkerIndex !== null) {
      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers];
        updatedMarkers[activeMarkerIndex].comment = comment; // Save the comment to the active marker
        return updatedMarkers;
      });
      setComment(''); // Clear the comment input
      setActiveMarkerIndex(null); // Reset the active marker
    }
  };

  useEffect(() => {
    console.log('Markers:', markers); // Debugging: check current markers and comments
  }, [markers]);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick} // Register the click event
        >
          {markers.map((marker, index) => (
            <CustomMarker key={index} position={marker} comment={marker.comment} />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Comment Input Section */}
      {activeMarkerIndex !== null && (
        <div style={{ marginTop: '20px' }}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            rows="3"
            style={{ width: '100%' }}
          />
          <button onClick={handleSaveComment} style={{ marginTop: '10px' }}>
            Save Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
