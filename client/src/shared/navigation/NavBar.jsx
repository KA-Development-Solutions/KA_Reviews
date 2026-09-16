//Services
import { useState } from "react"
import { NavLink } from "react-router-dom";
//Assets
import { HamburgerIcon, SearchIcon } from "../assets/AppSvgs";
//Styles
import "./NavBar.css";



export default function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [isUser, setIsUser] = useState(false);

    function MenuToggle(toggle){
        setMenuOpen(toggle);
    }
    return (
        <nav>
            <div className="nav-left">
                <NavLink to="/" className="nav-logo">
                    <img className="nav-logo-img" src="" alt="AKA Logo" />
                    <h2 className="nav-name">AKA</h2>
                </NavLink>
                <div className="nav-menu-btn">
                    <button className="nav-menu-toggle"
                        onClick={() => MenuToggle(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}>
                    <HamburgerIcon size={28}/>
                    
                    </button>
                    <h3>Menu</h3>  
                </div>
                
                <div className="nav-searchbar">
                    <input placeholder="Search Reviews"></input>
                    <SearchIcon/>
                </div>
            </div>
            <div className="nav-right">
                <div className="nav-auth">
                    {isUser ?
                    <NavLink to="/settings">user.username</NavLink>
                    :<NavLink to="/login">| Sign in</NavLink>}
                </div>
            </div>
            
            
        </nav>
    )
}