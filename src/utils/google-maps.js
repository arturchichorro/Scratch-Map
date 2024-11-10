// src/utils/google-maps.js
console.log('API Key available:', !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

const GOOGLE_MAPS_URL_PATTERNS = {
    // eslint-disable-next-line no-useless-escape
    PLACE: /\/place\/([^\/]+)\/?/,
    // eslint-disable-next-line no-useless-escape
    SEARCH: /\/search\/([^\/]+)\/?/,
    COORDS: /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    MAPS_SHORT: /maps\.app\.goo\.gl\//
  };
  
  /**
   * Loads required Google Maps libraries
   * @returns {Promise<{Map: any, PlacesService: any}>}
   */
  const loadMapsLibraries = async () => {
    try {
      const [mapsLibrary, placesLibrary] = await Promise.all([
        // eslint-disable-next-line no-undef
        google.maps.importLibrary("maps"),
        // eslint-disable-next-line no-undef
        google.maps.importLibrary("places")
      ]);
      
      return {
        Map: mapsLibrary.Map,
        PlacesService: placesLibrary.PlacesService
      };
    } catch (error) {
      throw new Error(`Failed to load Google Maps libraries: ${error.message}`);
    }
  };
  
  /**
   * Extracts search parameters from a Google Maps search URL
   */
  const extractSearchParams = (url) => {
    try {
      const urlObj = new URL(url);
      
      // Extract the search query from the path
      const searchMatch = urlObj.pathname.match(/\/search\/([^/@]+)/);
      const query = searchMatch ? decodeURIComponent(searchMatch[1].replace(/\+/g, ' ')) : '';
  
      // Extract coordinates and zoom level
      const coordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+),(\d+(\.\d+)?)(z|m)/);
      const center = coordsMatch ? {
        lat: parseFloat(coordsMatch[1]),
        lng: parseFloat(coordsMatch[2])
      } : null;
  
      if (!query || !center) {
        throw new Error('Could not extract search parameters from URL');
      }
  
      return { query, center };
    } catch (error) {
      throw new Error(`Failed to parse search parameters: ${error.message}`);
    }
  };
  
  /**
   * Searches for places using text search
   */

const searchPlaces = async (searchParams) => {
    try {
      const { Map, PlacesService } = await loadMapsLibraries();
      
      const mapDiv = document.createElement('div');
      const map = new Map(mapDiv);
      const service = new PlacesService(map);
  
      console.log('Search params:', {
        query: searchParams.query,
        location: searchParams.center,
        radius: 5000
      });
  
      return new Promise((resolve, reject) => {
        service.textSearch(
          {
            query: searchParams.query,
            // eslint-disable-next-line no-undef
            location: new google.maps.LatLng(searchParams.center.lat, searchParams.center.lng),
            radius: 5000 // 5km radius
          },
          (results, status) => {
            console.log('Places API response status:', status);
            // eslint-disable-next-line no-undef
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              console.log('Found places:', results.length);
              const formattedResults = results.map(place => ({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                address: place.formatted_address || place.vicinity || ''
              }));
              resolve(formattedResults);
            } else {
              console.error('Places API error:', {
                status,
                query: searchParams.query,
                location: searchParams.center
              });
              reject(new Error(`Place search failed: ${status}`));
            }
          }
        );
      });
    } catch (error) {
      console.error('Search error:', error);
      throw new Error(`Search failed: ${error.message}`);
    }
  };
  
  /**
   * Fetches place details using Google Places API
   */
  const getPlaceDetails = async (placeId) => {
    try {
      const { Map, PlacesService } = await loadMapsLibraries();
      
      const mapDiv = document.createElement('div');
      const map = new Map(mapDiv);
      const service = new PlacesService(map);
  
      return new Promise((resolve, reject) => {
        service.getDetails(
          {
            placeId: placeId,
            fields: ['name', 'geometry', 'formatted_address']
          },
          (place, status) => {
            // eslint-disable-next-line no-undef
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              resolve({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                name: place.name,
                address: place.formatted_address
              });
            } else {
              reject(new Error(`Place details request failed: ${status}`));
            }
          }
        );
      });
    } catch (error) {
      throw new Error(`Failed to get place details: ${error.message}`);
    }
  };
  
  /**
   * Extracts location information from a Google Maps URL
   */
  const extractLocationFromUrl = async (url) => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const path = urlObj.pathname;
  
      // Check if it's a search URL
      if (path.includes('/search/')) {
        const searchParams = extractSearchParams(url);
        return {
          type: 'SEARCH',
          ...searchParams
        };
      }
  
      // Check for place_id in query parameters
      const placeId = params.get('place_id');
      if (placeId) {
        return { type: 'PLACE', id: placeId };
      }
  
      // Check for place in the path
      const placeMatch = path.match(GOOGLE_MAPS_URL_PATTERNS.PLACE);
      if (placeMatch) {
        return {
          type: 'PLACE',
          id: decodeURIComponent(placeMatch[1].split('/')[0])
        };
      }
  
      // Check for coordinates in the URL
      const coordsMatch = url.match(GOOGLE_MAPS_URL_PATTERNS.COORDS);
      if (coordsMatch) {
        return {
          type: 'COORDS',
          lat: parseFloat(coordsMatch[1]),
          lng: parseFloat(coordsMatch[2])
        };
      }
  
      throw new Error('Unsupported URL format');
    } catch (error) {
      throw new Error(`Invalid Google Maps URL: ${error.message}`);
    }
  };
  
  /**
   * Parses a Google Maps URL and returns location data
   * @param {string} url - Google Maps URL
   * @returns {Promise<Array>} Array of location objects
   */
  export const parseGoogleMapsUrl = async (url) => {
    try {
      const locationInfo = await extractLocationFromUrl(url);
  
      switch (locationInfo.type) {
        case 'SEARCH':
          return await searchPlaces(locationInfo);
        
        case 'PLACE':
          { const placeDetails = await getPlaceDetails(locationInfo.id);
          return [placeDetails]; }
        
        case 'COORDS':
          return [{
            lat: locationInfo.lat,
            lng: locationInfo.lng,
            name: `Location at ${locationInfo.lat.toFixed(6)}, ${locationInfo.lng.toFixed(6)}`,
            address: ''
          }];
        
        default:
          throw new Error('Unsupported location type');
      }
    } catch (error) {
      throw new Error(`Failed to parse Google Maps URL: ${error.message}`);
    }
  };
  
  /**
   * Creates a Google Maps sharing URL from a list of markers
   * @param {Array} markers - Array of marker objects with lat and lng properties
   * @returns {string} Google Maps URL that can be shared
   */
  export const createGoogleMapsUrl = (markers) => {
    if (!markers || markers.length === 0) {
      throw new Error('No locations to export');
    }
  
    try {
      // Base URL for Google Maps
      const baseUrl = 'https://www.google.com/maps/dir/';
      
      // Convert markers to URL parameters
      const locationParams = markers.map(marker => {
        if (!marker.lat || !marker.lng) {
          throw new Error('Invalid marker data: missing coordinates');
        }
        return `${marker.lat},${marker.lng}`;
      }).join('/');
  
      // Create the full URL
      const fullUrl = `${baseUrl}${locationParams}`;
      
      // Google Maps has a URL length limit of approximately 2048 characters
      if (fullUrl.length > 2048) {
        throw new Error('Too many locations to export to Google Maps (URL length exceeded)');
      }
  
      return fullUrl;
    } catch (error) {
      throw new Error(`Failed to create Google Maps URL: ${error.message}`);
    }
  };
  
  /**
   * Opens the Google Maps URL in a new tab and copies it to clipboard
   * @param {string} url - Google Maps URL
   * @returns {Promise<void>}
   */
  export const shareGoogleMapsUrl = async (url) => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      
      // Open in new tab
      window.open(url, '_blank');
    } catch (error) {
      throw new Error(`Failed to share Google Maps URL: ${error.message}`);
    }
  };