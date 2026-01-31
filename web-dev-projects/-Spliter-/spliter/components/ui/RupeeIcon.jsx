import React from 'react';
import { cn } from "@/lib/utils"

import PropTypes from 'prop-types';

const RupeeIcon = ({ className, size = 24, fill = 'currentColor', stroke = 'currentColor' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64" // Changed viewBox to 64x64 for better scaling and consistency
            fill={fill}
            stroke={stroke}
            className={cn(
                "h-6 w-6", // Default size, same as the default for other icons.
                className,
                size && `h-[${size}px] w-[${size}px]` // Override size if provided
            )}
            aria-hidden="true" // Important for accessibility, especially if used alongside text.
        >
            <g>
                <path
                    d="M32.03,13.37c-10.24,0-18.57,8.33-18.57,18.57h4.2c0-8,6.48-14.48,14.37-14.48s14.37,6.48,14.37,14.48h4.2
                    c0-10.24-8.33-18.57-18.57-18.57Z"
                    fill={fill} // Use the provided fill color
                />
                <path
                    d="M45.54,31.94H18.51v4.2h27.03v-4.2Z"
                    fill={fill} // Use the provided fill color
                />
                <path
                    d="M27.1,17.57v18.17c0,1.15,0.93,2.08,2.08,2.08h5.64c1.15,0,2.08-0.93,2.08-2.08V17.57h4.2v18.17
                    c0,3.46-2.81,6.27-6.27,6.27h-5.64c-3.46,0-6.27-2.81-6.27-6.27V17.57h4.2Z"
                    fill={fill} // Use the provided fill color
                />
            </g>
        </svg>
    );
};

// Removed duplicate export default statement
RupeeIcon.propTypes = {
    className: PropTypes.string, // Allows for Tailwind CSS classes
    size: PropTypes.number,      // Optional: Allows specifying the size of the icon
    fill: PropTypes.string,     // Optional: Allows specifying the fill color
    stroke: PropTypes.string,   // Optional: Allows specifying the stroke color
};

export default RupeeIcon;
