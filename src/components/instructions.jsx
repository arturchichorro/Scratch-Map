import { useState } from 'react';
import { FaInfo } from "react-icons/fa6";
import IconButton from './ui/button';


function Instructions() {
    const [showInstructions, setShowInstructions] = useState(false);

    const handleInstructionsToggle = () => {
        setShowInstructions(prev => !prev);
    };

    return (
        <div className="relative flex flex-col items-center">
            <IconButton 
                onClick={handleInstructionsToggle}
            >
                <FaInfo size={12}/>
            </IconButton>
            {showInstructions && (
                <div className="absolute right-[-20px] mr-4 top-[-500px] w-80 p-4 border border-gray-300 rounded bg-gray-100 shadow-lg">
                    <p className="font-semibold">Instructions:</p>
                    <ul className="list-disc list-inside">
                        <li>Navigate: Click and drag to move; use zoom controls to zoom in/out.</li>
                        <li>Add a Pin: Click on any location to drop a pin instantly visible to all users.</li>
                        <li>Add Comments: After placing a pin, enter a description (e.g., &quot;Great burger place&quot;) and hit Submit. Comments cannot be edited once submitted.</li>
                        <li>View Comments: Click any pin to see comments left by others.</li>
                        <li>Click on the Map Icon within Comments to open location on Google Maps.</li>
                        <li>Remove Pins: Open the comment and click Delete.</li>
                        <li>Real-Time Updates: All pins and comments update live.</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Instructions;
