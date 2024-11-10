import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { RxDownload } from 'react-icons/rx';
import Button from './ui/button';
import ImportDialog from './import-dialog';

function ImportLocation({ setMarkers }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleImport = useCallback((newMarkers) => {
        setMarkers(currentMarkers => [...currentMarkers, ...newMarkers]);
    }, [setMarkers]);

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