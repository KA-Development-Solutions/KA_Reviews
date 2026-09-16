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
