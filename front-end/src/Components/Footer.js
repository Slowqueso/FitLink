import React from 'react'
import '../styles/styles.css';
import { footerList } from './Data';
import { Link } from 'react-router-dom';

const FooterList = () =>{
    return footerList.map(list=>{
        return (
            <span>
                <h2 className="header-card-title f-20 w-400 center-align unselectable">{list.header}</h2>
                <ul class="footer-list">
                    {list.content.map(obj=>{
                        return (
                            <li>
                                <a href={obj.link}><h2 className="content-para footer-link f-16 unselectable">{obj.subHeader}</h2></a>
                            </li>
                        )
                    })}
                </ul>
            </span>
        )
    })
}


const Footer = () => {
    return (
        <div>
            <footer className="ind-footer">
                <div className="flex-container-sb">
                    <h2 className="nav-header f-36 unselectable">Fit<span style={{color: "red"}}>Link</span></h2>
                    <h2 className="nav-header f-16 unselectable">Links Heatlth to Success</h2>
                </div>
                <div className="flex-container-sb">
                    <FooterList></FooterList>
                </div>
                <div class="footer-line center-align"></div>
                <span className="center-align flex-container" style={{width: "5cm"}}>
                    <Link to="#">
                        <i className="fab fa-instagram color-white side-margin f-26"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-facebook-square color-white side-margin f-26"></i>
                    </Link>
                    <Link to="#">
                        <i className="fab fa-twitter-square color-white side-margin f-26"></i>                    
                    </Link>
                </span>
            </footer>
        </div>
    )
}

export default Footer
