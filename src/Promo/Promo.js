import React, { Component } from 'react';

import './promo.css';
import logoqr from '../../images/qrcode.png';
import logo from '../../images/logo.png';
import { particles } from '../particles'
import password from '../../config/password';

class Promo extends Component {
  componentDidMount() {
    window.particlesJS('particles', particles);
  }

  render() {
    if (this.props.params.pass === password) {
      return (
        <div className="Home">
          <div className="container">
            <div id="particles"/>
            <img src={logo} alt="" width="230" style={{position: "absolute", left: 0, top: 0}}/>
            <div id="content">
              <h1 className="title"><span style={{color: "#ec0a12"}}>Career</span><span style={{color: "#0372b8"}}> Speed Dating</span></h1>
              <div className="instruction">Which company is the best for <span style={{fontWeight: 700, color: "black"}}>YOU</span>?</div>
              <div className="instruction">Visit <span style={{color: "black", fontSize: "45px", fontWeight: "bold"}}>matchmaking.fer.hr</span></div>
              <div className="instruction">or scan:</div>
              <img src={logoqr} alt="goo.gl/Y8bP2i" height="350"/>
              <div className="instruction">to find out!</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Promo;
