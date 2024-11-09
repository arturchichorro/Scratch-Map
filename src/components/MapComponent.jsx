import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './CustomMarker';

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
  const [title, setTitle] = useState(''); // State to store current title input
  const [comment, setComment] = useState(''); // State to store current comment body input
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null); // Track which marker is being commented on
  const [isWaitingForComment, setIsWaitingForComment] = useState(false); // Flag to control comment input state
  const [tempMarker, setTempMarker] = useState(null); // Temporary marker to be discarded if canceled

  // Function to handle clicks on the map
  const handleMapClick = useCallback((event) => {
    if (isWaitingForComment) return; // Prevent placing another marker if waiting for comment

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      title: '', // Initially no title for the new marker
      comment: '', // Initially no comment for the new marker
    };

    // Add new temporary marker and set it as the active marker for comment input
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setTempMarker(newMarker); // Store the temporary marker
    setActiveMarkerIndex(markers.length);
    setIsWaitingForComment(true); // Set to waiting state to enforce comment input
  }, [isWaitingForComment, markers]);

  // Function to handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Function to save the comment and title
  const handleSaveComment = () => {
    if (activeMarkerIndex !== null) {
      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers];
        updatedMarkers[activeMarkerIndex].title = title; // Save the title to the active marker
        updatedMarkers[activeMarkerIndex].comment = comment; // Save the comment to the active marker
        return updatedMarkers;
      });
      setTitle('');
      setComment('');
      setActiveMarkerIndex(null);
      setTempMarker(null); // Clear the temporary marker
      setIsWaitingForComment(false); // Exit the waiting state, allow placing new markers
    }
  };

  // Function to cancel the comment input
  const handleCancelComment = () => {
    setTitle('');
    setComment('');
    setActiveMarkerIndex(null);
    setIsWaitingForComment(false); // Exit the waiting state without placing a comment
    setMarkers((prevMarkers) => prevMarkers.filter(marker => marker !== tempMarker)); // Remove the temporary marker
    setTempMarker(null); // Clear the temporary marker state
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
            <CustomMarker key={index} position={marker} title={marker.title} comment={marker.comment} />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Comment Input Section */}
      {isWaitingForComment && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            rows="3"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSaveComment} style={{ marginRight: '10px' }}>
              Save Comment
            </button>
            <button onClick={handleCancelComment}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
