# Scratch Map Requirements

## Overview
Scratch Map is a real-time collaborative web application built with React and react-together that allows users to create and share disposable collaborative maps. The application leverages Google Maps API for map rendering and supports simultaneous multi-user interactions.

## Technical Stack
- React 18.3.1
- react-together 0.2.0 for real-time collaboration
- Google Maps API (@react-google-maps/api 2.20.3)
- Tailwind CSS for styling
- Vite for build tooling

## Environment Requirements
- Node.js (latest LTS recommended)
- Environment Variables:
  - `VITE_GOOGLE_API_KEY`: Google Maps API key required for map functionality

## User Stories

### Implemented Features
- [X] As a user, I should be able to create a map and share it with others
  - Implementation: Uses react-together for session management
  - Key components: MapWithControls, ButtonQR

- [X] As a user, I should be able to add locations to my map
  - Implementation: Uses useMyStateTogether hook with 'map' key
  - Component: AddLocation, MapComponent

- [X] As a user, I should be able to clear all locations from my map
  - Implementation: Handled through LeaveSession component
  - Uses setMarkers from useMyStateTogether

- [X] As a user, I should be able to generate a QR code for my map
  - Implementation: Uses react-qr-code library
  - Component: ButtonQR

- [X] As a user, I should be able to scan a QR code to join a map
  - Implementation: URL-based session joining
  - Managed through react-together session system

- [X] As a user, I should be able to kill all sessions on my map
  - Implementation: LeaveSession component functionality
  - Clears both markers and location data

- [X] As a user, I should be able to add comments to any location on my map
  - Implementation: Marker comment system in MapComponent
  - Uses state management for persistence

- [X] As a user, I should be able to view comments left by others on my map
  - Implementation: CustomMarker component
  - Real-time updates via react-together state sync

- [X] As a user, I should be able to click on a comment to open the location in Google Maps
  - Implementation: CustomMarker click handler
  - Uses Google Maps URL format

### Pending Features
- [ ] As a user, I should be able to import the locations from any public Google Map
  - Technical considerations: Will require Google Maps Places API
  - Suggested component: ImportFromGoogle

- [ ] As a user, I should be able to import/export locations from/to KML files
  - Technical considerations: Need KML parsing library
  - Suggested components: KMLImporter, KMLExporter

- [ ] As a user, I should be able to export locations to a shared Google Map
  - Technical considerations: Google Maps API write permissions required
  - Dependency on Google Maps sharing API

- [ ] As a user, I should be able to delete/edit comments I created
  - Technical considerations: 
    - Need user identification system
    - Extend marker state structure to include authorId
    - Add modification timestamp

- [ ] As a user, I should be able to import locations by prompting a Google Maps search
  - Technical considerations: 
    - Requires Places API integration
    - Consider rate limiting
    - Add search input component

## State Management
The application uses two primary types of shared state:
1. `useMyStateTogether('map', [])` for markers and comments
2. `useMyStateTogetherWithPerUserValues('userloc', {})` for user locations

### State Structure
```javascript
// Markers State
markers = [
  {
    lat: number,
    lng: number,
    comment?: string
  }
]

// Location State
location = {
  lat: number,
  lng: number
}

// Per User Location State
locationPerUser = {
  [userId: string]: {
    lat: number,
    lng: number
  }
}
```

## File Structure
```
.
├── src/
│   ├── components/
│   │   ├── add-location.jsx      # Location addition logic
│   │   ├── custom-marker.jsx     # Marker with comment display
│   │   ├── generate-qr.jsx       # QR code generation
│   │   ├── leave-session.jsx     # Session management
│   │   ├── map-component.jsx     # Core map functionality
│   │   ├── map-with-controls.jsx # Main container component
│   │   └── ui/                   # Shared UI components
│   ├── hooks/
│   │   ├── getNewValue.js
│   │   ├── useMyStateTogether.js
│   │   └── useMyStateTogetherWithPerUserValues.js
```

## Data Persistence
- Local storage for client-side persistence
- react-together for real-time state synchronization
- No backend database required - sessions are disposable

## Performance Considerations
- Map markers are rendered efficiently using React.memo
- Event handlers are memoized with useCallback
- Map style configurations are defined outside component scope

## Contributing
When implementing new features:
1. Follow existing component patterns
2. Use react-together hooks for shared state
3. Implement PropTypes validation
4. Follow Tailwind styling patterns
5. Add appropriate error handling
6. Update this documentation

## Key Project Links
- Trello board: https://trello.com/b/9r7uf8OU/scratchmapapp
- GitHub repository: https://github.com/arturchichorro/Scratch-Map
- Problematic project listing: https://problemattic.app/project-details/scratchmap