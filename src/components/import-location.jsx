import PropTypes from 'prop-types';
import { useState } from 'react';
import { RxDownload } from 'react-icons/rx';
import Button from './ui/button';
import ImportDialog from './import-dialog';

function ImportLocation({ setMarkers }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleImport = (newMarkers) => {
        setMarkers(currentMarkers => [...currentMarkers, ...newMarkers]);
    };

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>
                <RxDownload size={24} />
            </Button>
            <ImportDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onImport={handleImport}
            />
        </>
    );
}

ImportLocation.propTypes = {
    setMarkers: PropTypes.func.isRequired,
};

export default ImportLocation;