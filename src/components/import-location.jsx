import PropTypes from 'prop-types';
import { RxDownload } from 'react-icons/rx';
import Button from './ui/button';

function ImportLocation({ setMarkers }) {

    console.log(setMarkers);

    const handleImport = () => {
        console.log("Import functionality to be implemented")
    };

    return (
        <Button onClick={handleImport}>
            <RxDownload size={24} />
        </Button>
    );
}

ImportLocation.propTypes = {
    setMarkers: PropTypes.func.isRequired,
  };

export default ImportLocation;