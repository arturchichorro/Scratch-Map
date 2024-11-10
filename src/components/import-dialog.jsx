import { useState } from 'react';
import PropTypes from 'prop-types';
import { RxCross2 } from "react-icons/rx";
import { searchPlaces } from '../utils/google-maps';

function ImportDialog({ isOpen, onClose, onImport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
    
    try {
      const results = await searchPlaces({
        query: searchQuery,
        center: { lat: 0, lng: 0 }, // Will use browser's geolocation in full implementation
        radius: 5000
      });
      setSearchResults(results.slice(0, 50)); // Limit to 50 results
    } catch (err) {
      setError('Failed to search places. Please try again.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTogglePlace = (place) => {
    const newSelected = new Set(selectedPlaces);
    if (newSelected.has(place)) {
      newSelected.delete(place);
    } else {
      newSelected.add(place);
    }
    setSelectedPlaces(newSelected);
  };

  const handleImport = () => {
    const markers = Array.from(selectedPlaces).map(place => ({
      lat: place.lat,
      lng: place.lng,
      comment: place.name
    }));
    onImport(markers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Import Places</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <RxCross2 size={20} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="p-4 border-b">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for places..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </form>

        <div className="max-h-96 overflow-y-auto p-4">
          {searchResults.map((place) => (
            <label
              key={`${place.lat}-${place.lng}`}
              className="flex items-start gap-2 p-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPlaces.has(place)}
                onChange={() => handleTogglePlace(place)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">{place.name}</div>
                <div className="text-sm text-gray-600">{place.address}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={selectedPlaces.size === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            Import Selected ({selectedPlaces.size})
          </button>
        </div>
      </div>
    </div>
  );
}

ImportDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default ImportDialog;