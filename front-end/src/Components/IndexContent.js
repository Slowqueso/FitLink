import React from 'react';
import { section } from './Data';
import '../styles/styles.css';

const SectionContent = () => {
    return section.map(obj => {
        if(obj.left===true){
            return(
                <div className="content-left">
                    <h1 className="content-header">{obj.title}</h1>
                    <span>
                        <p className="content-para unselectable">{obj.para}</p>
                        <div style={{backgroundImage: `url('${obj.imagePath}')`}} className="banner-image">
                            <div className="banner-cover-right"></div>
                        </div>
                    </span>
                </div>
            )
        }else{
            return(
                <div className="content-right">
                    <h1 className="content-header">{obj.title}</h1>
                    <span>
                        <div style={{backgroundImage: `url('${obj.imagePath}')`}} className="banner-image">
                            <div className="banner-cover-right"></div>
                        </div>
                        <p className="content-para unselectable">{obj.para}</p>
                    </span>
                </div>
            )
        }
    });
}


const IndexContent = () => {
    return (
        <div>
            <section className="ind-section">
                <SectionContent />
            </section>
        </div>
    )
}

export default IndexContent
