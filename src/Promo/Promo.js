import React, { Component } from 'react';

import './promo.css';
import logoqr from '../../images/qrcode.png';
import logo from '../../images/logo.png';
import { particles } from '../particles'
import password from '../../config/password';
import Item from '../Panel/Item';

class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };

    this.renderMatches = this.renderMatches.bind(this);
  }

  componentDidMount() {
    // window.particlesJS('particles', particles);

    const socket = window.io();

    socket.on('newMatch', newMatch => {


      const matches = [
        newMatch,
        this.state.matches[0],
        this.state.matches[1]
      ];

      this.setState({ matches });
    });
  }

  renderMatches() {
    console.log('', this.state.matches);

    return this.state.matches.map(item => {
      if (item) {
        return <Item key={item._id} name={item.username.toUpperCase()}
                     company={item.companyName.toUpperCase()}
                     top={(item.index - 1) * 60 + 5} numberTop={(item.index - 1) * 60 - 12}
                     color={(item.score)} score={item.score}/>;
      }
    });
  }

  render() {
    if (this.props.params.pass === password) {
      return (
        <div className="Home">
          <div className="container">
            <div id="particles"/>
            <img src={logo} alt="" width="230" style={{position: "absolute", left: 0, top: 0}}/>
            <div className="content" style={{width: '40%'}}>
              <h1 className="title"><span style={{color: "#ec0a12"}}>Career</span><span style={{color: "#0372b8"}}> Speed Dating</span></h1>
              <div className="instruction">Which company is the best for <span style={{fontWeight: 600, color: "#0372b8"}}>YOU</span>?</div>
              <div className="instruction">Visit <span style={{color: "#ec0a12", fontSize: "65px", fontWeight: "bold"}}>matchmaking.fer.hr</span></div>
              <div className="instruction">or scan:</div>
              <img src={logoqr} alt="matchmaking.fer.hr" height="250" width="250"/>
              <div className="instruction">to find out!</div>
            </div>
            <div className="content">
              <h1 className="title">Latest matches</h1>
              {this.renderMatches()}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Promo;
