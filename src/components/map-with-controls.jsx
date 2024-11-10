// import StateTogether from './components/state-together-example'
import MapComponent from './map-component.jsx';
// import MapTest from './components/map-test.jsx';
import ButtonQR from './generate-qr.jsx';
import { ConnectedUsers, useIsTogether } from 'react-together';
import AddLocation from './add-location.jsx';
import LeaveSession from './leave-session.jsx';
import useMyStateTogether from '../hooks/useMyStateTogether.js';
import useMyStateTogetherWithPerUserValues from '../hooks/useMyStateTogetherWithPerUserValues.js';
// import ImportDialog from './ui/import-dialog.jsx';
// import ExportDialog from './ui/export-dialog.jsx';

const EMPTY_OBJECT = {}

function MapWithControls() {
    const [markers, setMarkers] = useMyStateTogether('map', []);
    const [location, setLocation, locationPerUser] = useMyStateTogetherWithPerUserValues('userloc', EMPTY_OBJECT);
    const isTogether = useIsTogether();


    return (
        <div className="relative grid grid-cols-1 gap-4 justify-center items-center max-w-screen-lg">
            <div className="p-6 flex flex-col gap-5">
                <MapComponent 
                    markers={markers} 
                    setMarkers={setMarkers}
                    location={location}
                    locationPerUser={locationPerUser}
                />
            </div>
            <div className="flex justify-center gap-6 px-2">
                <AddLocation location={location} setLocation={setLocation}/>
                {/* <ImportDialog setMarkers={setMarkers} /> */}
                <LeaveSession setLocation={setLocation} setMarkers={setMarkers}/>
                {/* <ExportDialog markers={markers} /> */}
                <ButtonQR />
            </div>
            {isTogether && (
                <div className="absolute top-10 right-10 p-2 rounded-2xl shadow-lg flex justify-center items-center bg-opacity-35 bg-slate-900">
                    <ConnectedUsers maxAvatars={5} />
                </div>
            )}
        </div>
    );
}


export default MapWithControls;