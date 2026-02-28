import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import ImageAnalyser from "../services/ImageAnalyser";
import "./Header.css"

const Header = () =>{
    const navigate = useNavigate();
    
    return(
        <header className="navbar">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to='/home' replace  className="nav-item">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>



    )
}

export default Header