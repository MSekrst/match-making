import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import 'whatwg-fetch';

import '../particles.js';
import './table.css';
import { particles } from '../particles';
import logo from '../../images/logo.png';
import password from '../../config/password';

import Company from './Company';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
    this.renderItems = this.renderItems.bind(this);
  }

  componentWillMount() {
    fetch('/tables/companies').then((res) => {
      const promise = res.json();

      promise.then(value => {
        this.setState({
          companies: value
        });
      });
    });
  }

  componentDidMount() {
    window.particlesJS('particles', particles);

    let socket = window.io();

    socket.on('topCompanies', (topCompanies) => {
      this.setState({companies: topCompanies.companies});
    });
  }

  renderItems() {
    if (!this.state.companies) {
      return <div>No results yet</div>
    }

    return this.state.companies.map(item => <Company key={item._id} name={item.companyName.toUpperCase()}
                                                     image={item.logoUrl} match={item.matches}/>)
  }

  render() {
    if (this.props.params.pass === password) {
      return (
        <div className="Panel">
          <div className="panel">
            <div id="particles"/>
            <img src={logo} alt="" width="230" style={{position: "absolute", left: 0, top: 0}}/>
            <div id="panelDiv">
              <div id="panelHeader">
                <h1 className="header" style={{fontSize: "50px"}}>COMPANIES WITH THE MOST MATCHES</h1>
              </div>
              <FlipMove id="panelDiv1" staggerDurationBy="30"
                        duration={500}
                        enterAnimation="elevator"
                        leaveAnimation="elevator">
                {this.renderItems()}
              </FlipMove>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Table;
