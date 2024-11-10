/**
 * Parses KML file content and extracts coordinates and placemark data
 * @param {string} kmlContent - Raw KML file content
 * @returns {Array} Array of marker objects with coordinates and metadata
 */
export const parseKML = (kmlContent) => {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlContent, 'text/xml');
    const placemarks = kmlDoc.getElementsByTagName('Placemark');
    const markers = [];
  
    for (const placemark of placemarks) {
      try {
        // Get name and description if available
        const name = placemark.getElementsByTagName('name')[0]?.textContent || '';
        const description = placemark.getElementsByTagName('description')[0]?.textContent || '';
  
        // Get coordinates
        const coordinates = placemark.getElementsByTagName('coordinates')[0]?.textContent;
        if (!coordinates) continue;
  
        // Parse coordinates (KML format is longitude,latitude,altitude)
        const [lng, lat] = coordinates.trim().split(',').map(Number);
  
        if (isNaN(lat) || isNaN(lng)) continue;
  
        markers.push({
          lat,
          lng,
          comment: name ? `${name}\n${description}` : description
        });
      } catch (error) {
        console.error('Error parsing placemark:', error);
        continue;
      }
    }
  
    return markers;
  };
  
  /**
   * Generates KML content from markers
   * @param {Array} markers - Array of marker objects
   * @returns {string} KML file content
   */
  export const generateKML = (markers) => {
    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
      <name>Scratch Map Locations</name>
      <description>Exported locations from Scratch Map</description>
      ${markers.map(marker => `
      <Placemark>
        ${marker.comment ? `<name>${marker.comment.split('\n')[0]}</name>` : ''}
        ${marker.comment ? `<description>${marker.comment}</description>` : ''}
        <Point>
          <coordinates>${marker.lng},${marker.lat},0</coordinates>
        </Point>
      </Placemark>`).join('')}
    </Document>
  </kml>`;
  
    return kmlContent;
  };