import PropTypes from 'prop-types';
// import {useState} from 'react';
import { Marker } from '@react-google-maps/api';
// import { TbBrandGoogleMaps } from "react-icons/tb";
// import { useConnectedUsers } from 'react-together';


const LocationMarker = ({ position }) => {
//   const [showInfoWindow, setShowInfoWindow] = useState(false);
//   // const connectedUsers = useConnectedUsers();

//   const handleMarkerClick = () => {
//     setShowInfoWindow((prev) => !prev);
//   };

//   const googleMapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

  return (
    <div>
      <Marker
        position={position}
        icon={{
          // eslint-disable-next-line no-undef
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: 'red',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
        // onClick={handleMarkerClick}
      />
      {/* {showInfoWindow && (
      <InfoWindow 
        position={position} 
        onCloseClick={handleMarkerClick}
      >
        <div className="max-w-[220px] rounded-lg bg-white shadow-md flex flex-col gap-3">
          
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
    
    )} */}
    </div>
  );
};

LocationMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  comment: PropTypes.string,
  onDelete: PropTypes.func,
};

export default LocationMarker;
