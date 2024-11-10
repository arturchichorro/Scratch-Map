import { useState } from 'react';
import PropTypes from 'prop-types';
import { RxUpload } from "react-icons/rx";
import Button from './button';
import { generateKML } from '../../utils/kml-parser';
import { createGoogleMapsUrl, shareGoogleMapsUrl } from '../../utils/google-maps';

function ExportDialog({ markers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGoogleMapsExport = async () => {
    try {
      setError('');
      setSuccess('');
      
      const url = createGoogleMapsUrl(markers);
      await shareGoogleMapsUrl(url);
      
      setSuccess('Map URL copied to clipboard and opened in new tab');
      setTimeout(() => {
        setIsOpen(false);
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleKMLExport = () => {
    try {
      setError('');
      setSuccess('');
      
      const kmlContent = generateKML(markers);
      const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scratch-map-locations.kml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setSuccess('KML file downloaded successfully');
      setTimeout(() => {
        setIsOpen(false);
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <RxUpload size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Export Locations</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            <RxUpload size={20} className="rotate-45" />
          </button>
        </div>

        <div className="grid gap-4">
          <button 
            onClick={handleGoogleMapsExport}
            className="w-full flex items-center gap-2 justify-center bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <RxUpload size={18} />
            <span className="text-white">Export to Google Maps</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-300">or</span>
            </div>
          </div>

          <button 
            onClick={handleKMLExport}
            className="w-full flex items-center gap-2 justify-center bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <RxUpload size={18} />
            <span className="text-white">Export as KML file</span>
          </button>

          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md mt-4">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-400 bg-green-900/20 p-3 rounded-md mt-4">
              {success}
            </p>
          )}

          <p className="text-sm text-slate-300 mt-2">
            KML files can be imported into Google Earth and other mapping applications.
          </p>
        </div>
      </div>
    </div>
  );
}

ExportDialog.propTypes = {
  markers: PropTypes.array.isRequired,
};

export default ExportDialog;