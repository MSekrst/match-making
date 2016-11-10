import React, { Component } from 'react';
import './Home.css';
import logo from '../../images/qrcode.png';

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
          <div id="content">
            <h1>Career Speed Dating</h1>
            <p>Saznaj za koju si tvrtku rođen!<br />
              goo.gl/5oIR<br />
              ILI</p>
            <img src={logo} alt="goo.gl/5oIR" height="300"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
