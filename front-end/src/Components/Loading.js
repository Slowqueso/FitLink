import React from 'react';
import navData from "./Data.js";


const Loading = () => {
    return (
        <div className="loading">
            <div className="load-container">
                <div className="flex-container">
                    <img src={navData.logo} className="load-logo unselectable"></img>
                    <h1 className="nav-header f-48 unselectable">Fit<span style={{color: "red"}}>Link</span></h1>
                </div>
                <h3 className="content-para unselectable" style={{margin: "auto"}}>Loading...</h3>
            </div>
        </div>
    )
}
export default Loading
