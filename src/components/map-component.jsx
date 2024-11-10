import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './custom-marker';
import LocationMarker from './location-marker';

const mapContainerStyle = {
  width: '600px',
  height: '600px',
  borderRadius: '15px',  
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  };

  const EMPTY_OBJECT = {}

const center = {
  lat: 38.7169,
  lng: -9.1399,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  scaleControl: false,
  draggable: true,
  clickableIcons: false,
  styles: [
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#2b8cbe" }, { visibility: "on" }]},
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#a6bddb" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#FFFFED" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#ece7f2" }] },
    { elementType: "labels", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text", stylers: [{ visibility: "simplified" } ]},
    { elementType: "labels.icon", stylers: [{ visibility: "off"}]},
],
};

function MapComponent({ markers, setMarkers, location, setLocation, locationPerUser }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [inputPosition, setInputPosition] = useState(null);

  const handleMapClick = useCallback((event) => {
    if (activeMarker) return;

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarker(newMarker);
    setInputPosition({ x: event.pixel.x, y: event.pixel.y });
  }, [activeMarker, setMarkers]);

  const handleSaveNote = (comment) => {
    if (!activeMarker) return;
  
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.lat === activeMarker.lat && marker.lng === activeMarker.lng
          ? { ...marker, comment }
          : marker
      )
    );
    setActiveMarker(null);
    setInputPosition(null);
  };
  
  const handleDeleteNote = (marker) => {
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
  };

  const handleDeleteLoc = () => {
    setLocation(EMPTY_OBJECT);
  };
  

  const handleCancel = () => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.lat !== activeMarker.lat || marker.lng !== activeMarker.lng)
    );
    setActiveMarker(null);
    setInputPosition(null);
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  console.log("location: ",location)

  return (
    <div className="relative flex justify-center">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
          options={mapOptions}
          className="rounded-lg shadow-lg"
        >
          {location.lat && location.lng && (
            <LocationMarker
              key="current-user"
              position={location}
              onDelete={() => handleDeleteLoc()}
            />
          )}

          {Object.keys(locationPerUser).map((userId) => {
            const userLocation = locationPerUser[userId];
            return (
              <LocationMarker
                key={userId}
                position={userLocation}
              />
            );
          })}

          {markers.map((marker, index) => (
            <CustomMarker
              key={index}
              position={marker}
              comment={marker.comment}
              onDelete={() => handleDeleteNote(marker)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {activeMarker && inputPosition && (
        <div
          className="absolute bg-white p-4 rounded-lg shadow-md transform -translate-x-1/2 -translate-y-full"
          style={{ top: inputPosition.y, left: inputPosition.x }}
        >
          <input
            value={activeMarker.comment || ''}
            onChange={(e) => setActiveMarker({ ...activeMarker, comment: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSaveNote(activeMarker.comment);
              }
            }}
            placeholder="Enter comment"
            className="w-full p-1 border border-gray-300 rounded-md text-nowrap"
            onSubmit={() => handleSaveNote(activeMarker.comment)}
          />
          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={() => handleSaveNote(activeMarker.comment)}
              className="px-4 py-1 text-white bg-blue-700 hover:bg-blue-800 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-1 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

MapComponent.propTypes = {
  markers: PropTypes.array.isRequired,
  setMarkers: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  locationPerUser: PropTypes.objectOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
};

export default MapComponent;
