import React, { Component } from 'react';
import './Home.css';
import logoqr from '../../images/qrcode.png';
import logo from '../../images/logo.png';

import { particles } from '../Panel/particles'

class Home extends Component {
  componentDidMount() {
    window.particlesJS('particles', particles);
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div id="particles"/>
          <img src={logo} width="230" style={{position: "absolute", left: 0, top: 0}}/>
          <div id="content">
            <h1>Career Speed Dating</h1>
            <p>Saznaj za koju si tvrtku rođen!<br />
              goo.gl/5oIR<br />
              ILI</p>
            <img src={logoqr} alt="goo.gl/5oIR" height="300"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
