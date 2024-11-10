import PropTypes from 'prop-types';
import {useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { TbBrandGoogleMaps } from "react-icons/tb";


const CustomMarker = ({ position, comment, userId, onDelete }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow((prev) => !prev);
  };

  const colorPalette = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F0E130',
    '#9B59B6',
    '#1ABC9C',
  ];

  const getColorForUserId = (userId) => {
    const hash = [...userId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorPalette[hash % colorPalette.length];
  };

  const markerColor = getColorForUserId(userId);

  const googleMapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

  return (
    <div>
      <Marker
        position={position}
        icon={{
          // eslint-disable-next-line no-undef
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 1,
        }}
        onClick={handleMarkerClick}
      />
      {showInfoWindow && (
      <InfoWindow 
        position={position} 
        onCloseClick={handleMarkerClick}
      
      >
        <div className="max-w-[220px] rounded-lg bg-white shadow-md flex flex-col gap-3">
          {comment && (
            <p className="text-gray-700 text-sm font-medium flex justify-center">
              {comment}
            </p>
          )}
          
          <div className="flex gap-3 justify-center">
            <a 
              href={googleMapsUrl}
              className="text-slate-700 hover:text-[#3d8f54] transition-colors flex items-center"
              target="_blank"
              rel="noopener noreferrer"
              title="View on Google Maps"
            >
              <TbBrandGoogleMaps size={20} />
            </a>
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all text-balance"
              title="Delete Marker"
            >
              Delete
            </button>
          </div>
        </div>
      </InfoWindow>
    
    )}
    </div>
  );
};

CustomMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  comment: PropTypes.string,
  userId: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default CustomMarker;
