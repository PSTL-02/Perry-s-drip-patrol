import React, { useState } from 'react';
// icons
import { IoHelpCircle } from "react-icons/io5";

const BubbleTransition = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className="help-bubble-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            <div className="help-bubble-closed" 
                style={{
                    opacity: isHovered ? 0 : 1,
                    visibility: isHovered ? 'hidden' : 'visible',
                    transition: 'opacity 0.5s ease, visibility 0.5s ease'
                }}>
                <p><IoHelpCircle /></p>
            </div>
            
            <div className="help-bubble-open" 
                style={{
                    opacity: isHovered ? 1 : 0,
                    visibility: isHovered ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease, visibility 0.5s ease'
                }}>
                <p>Sales are made through messaging the buyer through our chat system.</p>
            </div>
        </div>
    );
};

export default BubbleTransition;
