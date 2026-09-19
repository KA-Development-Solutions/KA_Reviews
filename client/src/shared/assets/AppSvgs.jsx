// Stroke uses currentColor so the icon inherits the parent's CSS `color`
export function HamburgerIcon({ size = 24, className = "", ...rest }){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={className}
            aria-hidden="true"
            {...rest}
        >
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    )
}

export function SearchIcon({ size = 24, className = "", ...rest }){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={className}
            aria-hidden="true"
            {...rest}
        >
            <circle cx="10.5" cy="10.5" r="6.5"/>
            <line x1="15.5" y1="15.5" x2="21" y2="21"/>
        </svg>
    )
}

/* Filled rather than stroked, so `color` paints the whole star.
   The 16 points alternate between an outer radius of 10 and an inner radius of 4,
   stepping 22.5 degrees around the centre to make the 8 spikes. */
export function EightPointStarIcon({ size = 24, className = "", ...rest }){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
            {...rest}
        >
            <polygon points="12,2 13.53,8.3 19.07,4.93 15.7,10.47 22,12 15.7,13.53 19.07,19.07 13.53,15.7 12,22 10.47,15.7 4.93,19.07 8.3,13.53 2,12 8.3,10.47 4.93,4.93 10.47,8.3"/>
        </svg>
    )
}
