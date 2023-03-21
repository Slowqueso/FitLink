import React from 'react'
import navData from "./Data.js";

const Logo = () => {
    return (
        <div className="flex-container v-align">
            <img className="nav-logo-img unselectable" src={navData.logo} alt=""></img>
            <h2 className="nav-header-red unselectable">Fit<span>Link</span></h2>
        </div>
    )
}

export default Logo
