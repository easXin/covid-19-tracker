import React from 'react'
import "./Navbar.css"

import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className>
            <nav className="navbar">
                <label className="navbar__logo">Covid 19</label>
                <li><a href="">Data&Stats</a></li>
                <li><a href="">News</a></li>
                <li><a href="">Contact</a></li>
            </nav>
        </div>
    )
}

export default Navbar
