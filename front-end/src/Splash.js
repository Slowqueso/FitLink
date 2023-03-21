import React from 'react';
import Logo from './Components/Logo';
import './styles/styles.css';
import { splashData } from './Components/Data';

const Splash = () => {
    return (
        <div className="splash-body">
            <header className="splash-header">
                <Logo></Logo>
                <h4 className="sub-title white-text unselectable">Links Health to Success</h4>
            </header>
            <section className="splash-section">
                <div className="grid">
                    <div className="tab-long" style={{backgroundImage:`url('${splashData.Home.path}')`}}>
                        <a href="/Home"><div className="white-cover-long"><h1 className="nav-header bottom-header unselectable">{splashData.Home.title}</h1></div></a>
                    </div>
                    <div className="block-grid">
                        <div className="tab-short" style={{backgroundImage: `url('${splashData.Account.path}')`, backgroundSize:"80%"}}>
                            <a href="/Account">
                                <div className="white-cover-short cover-end">
                                    <h1 className="sub-header right-header unselectable">{splashData.Account.title}</h1>
                                </div>
                            </a>
                        </div>
                        <div className="tab-short" style={{backgroundImage: `url('${splashData.Store.path}')`}}>
                            <a href="/Account">
                                <div className="white-cover-short cover-start">
                                    <h1 className="sub-header right-header unselectable">{splashData.Store.title}</h1>
                                </div>
                            </a>
                        </div>
                        <div className="tab-short" style={{backgroundImage: `url('${splashData.SignUp.path}')`}}>
                            <a href="/signup">
                                <div className="white-cover-short cover-end">
                                    <h1 className="sub-header right-header unselectable">{splashData.SignUp.title}</h1>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Splash
