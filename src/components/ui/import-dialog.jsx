// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { RxDownload } from "react-icons/rx";
// import Button from './button';
// import { parseGoogleMapsUrl } from '../../utils/google-maps';

function ImportDialog({ setMarkers }) {
  console.log(setMarkers)
  // const [isOpen, setIsOpen] = useState(false);
  // const [url, setUrl] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');

  // const handleImport = async () => {
  //   if (!url.trim()) {
  //     setError('Please enter a Google Maps URL');
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError('');
  //   setSuccess('');

  //   try {
  //     // Clean up the URL - remove any trailing whitespace or line breaks
  //     const cleanUrl = url.trim();
      
  //     // Basic URL validation before making the API call
  //     if (!cleanUrl.includes('google.com/maps') && !cleanUrl.includes('maps.app.goo.gl')) {
  //       throw new Error('Please enter a valid Google Maps URL');
  //     }

  //     // const locations = await parseGoogleMapsUrl(cleanUrl);
      
  //     if (!locations || locations.length === 0) {
  //       throw new Error('No valid locations found in the URL');
  //     }

  //     setMarkers(prevMarkers => [
  //       ...prevMarkers,
  //       ...locations.map(loc => ({
  //         lat: loc.lat,
  //         lng: loc.lng,
  //         name: loc.name || `Location at ${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`,
  //         address: loc.address || ''
  //       }))
  //     ]);

  //     setSuccess(`Successfully imported ${locations.length} location${locations.length !== 1 ? 's' : ''}`);
      
  //     // Clear the input and close dialog after a delay
  //     setTimeout(() => {
  //       setIsOpen(false);
  //       setUrl('');
  //       setSuccess('');
  //     }, 2000);

  //   } catch (error) {
  //     console.error('Import error:', error);
  //     if (error.message.includes('Failed to fetch')) {
  //       setError('Unable to process shortened URL. Please use the full Google Maps URL by copying from your browser\'s address bar.');
  //     } else {
  //       setError(error.message);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // if (!isOpen) {
  //   return (
  //     <Button onClick={() => setIsOpen(true)}>
  //       <RxDownload size={24} />
  //     </Button>
  //   );
  // }

  return (
    <p>somethgin</p>  )
  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  //     <div className="bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6">
  //       <div className="flex justify-between items-center mb-4">
  //         <h2 className="text-xl font-semibold text-white">Import Locations</h2>
  //         <button
  //           onClick={() => setIsOpen(false)}
  //           className="text-slate-300 hover:text-white transition-colors"
  //         >
  //           <RxDownload size={20} className="rotate-45" />
  //         </button>
  //       </div>

  //       <div className="space-y-4">
  //         <div>
  //           <label htmlFor="maps-url" className="block text-lg font-medium text-white mb-2">
  //             Google Maps URL
  //           </label>
  //           <input
  //             id="maps-url"
  //             type="text"
  //             value={url}
  //             onChange={(e) => setUrl(e.target.value)}
  //             placeholder="Paste Google Maps URL here"
  //             className="w-full px-4 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
  //           />
  //         </div>

  //         <button 
  //           onClick={handleImport}
  //           disabled={isLoading}
  //           className={`w-full flex items-center gap-2 justify-center bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-colors ${
  //             isLoading ? 'opacity-50 cursor-not-allowed' : ''
  //           }`}
  //         >
  //           <RxDownload size={18} />
  //           <span>{isLoading ? 'Importing...' : 'Import from Google Maps'}</span>
  //         </button>

  //         {error && (
  //           <p className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md">
  //             {error}
  //           </p>
  //         )}

  //         {success && (
  //           <p className="text-sm text-green-400 bg-green-900/20 p-3 rounded-md">
  //             {success}
  //           </p>
  //         )}

  //         <div className="mt-4 space-y-2">
  //           <h3 className="text-lg font-medium text-white">How to get a Google Maps URL:</h3>
  //           <ol className="space-y-2 text-slate-300">
  //             <li>1. Open Google Maps in your browser</li>
  //             <li>2. Search for a place or multiple places</li>
  //             <li>3. Copy the full URL from your browser&apos;s address bar</li>
  //           </ol>
  //           <p className="text-sm text-slate-400">
  //             To import multiple locations, share the results of a search or a list of places.
  //             Shortened URLs (maps.app.goo.gl) may not work - please use the full URL instead.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

ImportDialog.propTypes = {
  setMarkers: PropTypes.func.isRequired,
};

export default ImportDialog;