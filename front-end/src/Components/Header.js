import React from 'react'
import "../styles/styles.css";
import { headerData } from './Data';
// import Background from '../Assets/bannerBackground.jpg';
// import Background from '../Assets';
let bannerBackground = `url('${headerData.backgroundImage.path}')`;
// let bannerBackground = `url('${Background}')`;

let cardArrowStyle = {
    color: "white",
    position: "relative",
    margin: "0px",
    right: "-240px",
    bottom:"-20px",
    fontSize: "30px",
    padding: "0px"
}

const Header = () => {
    return (
        <div>
            <header id="header" className="ind-header" style={{backgroundImage: bannerBackground}}>
                <div className="banner">
                    <h1 className="banner-header unselectable">{headerData.backgroundImage.bannerHeader}<span>{headerData.backgroundImage.bannerHeaderEmp}</span></h1>
                </div>
                <div className="card-container">
                    <div className="header-card">
                        <h3 className="header-card-title unselectable">{headerData.card1Header}</h3>
                        <h4 className="header-card-sub unselectable">{headerData.card1SubHeader}</h4>
                        <i className="fas fa-arrow-right" style={cardArrowStyle}></i>
                    </div>
                    <div className="header-card">
                        <h3 className="header-card-title unselectable">{headerData.card2Header}</h3>
                        <h4 className="header-card-sub unselectable">{headerData.card2SubHeader}</h4>
                        <i className="fas fa-arrow-right" style={cardArrowStyle}></i>
                    </div>
                    <div className="header-card">
                        <h3 className="header-card-title unselectable">{headerData.card3Header}</h3>
                        <h4 className="header-card-sub unselectable">{headerData.card3SubHeader}</h4>
                        <i className="fas fa-arrow-right" style={cardArrowStyle}></i>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
