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
  const [markers, setMarkers] = useState([]); // State to store marker positions, titles, and comments
  const [activeMarker, setActiveMarker] = useState(null); // Track which marker is being added

  // Function to handle clicks on the map to add a marker
  const handleMapClick = useCallback((event) => {
    if (activeMarker) return; // Prevent adding a new marker if there's already an active one

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      title: '', // Empty title initially
      comment: '', // Empty comment initially
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarker(newMarker); // Set this new marker as the active one for input
  }, [activeMarker]);

  // Function to handle saving the title and comment
  const handleSaveNote = (title, comment) => {
    if (!activeMarker) return;

    setMarkers((prevMarkers) => {
      return prevMarkers.map((marker) =>
        marker.lat === activeMarker.lat && marker.lng === activeMarker.lng
          ? { ...marker, title, comment }
          : marker
      );
    });

    setActiveMarker(null); // Reset the active marker after saving
  };

  // Function to handle deleting a marker and its note
  const handleDeleteNote = (marker) => {
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
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
            <CustomMarker
              key={index}
              position={marker}
              title={marker.title}
              comment={marker.comment}
              onDelete={() => handleDeleteNote(marker)} // Pass delete handler to CustomMarker
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Display note input for title and comment when an active marker is selected */}
      {activeMarker && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Enter title"
            value={activeMarker.title}
            onChange={(e) =>
              setActiveMarker((prev) => ({ ...prev, title: e.target.value }))
            }
            style={{ width: '100%' }}
          />
          <textarea
            value={activeMarker.comment}
            onChange={(e) =>
              setActiveMarker((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder="Enter comment"
            rows="3"
            style={{ width: '100%' }}
          />
          <button
            onClick={() => handleSaveNote(activeMarker.title, activeMarker.comment)}
            style={{ marginTop: '10px' }}
          >
            Save Note
          </button>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
