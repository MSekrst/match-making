import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import 'whatwg-fetch';

import '../particles.js';
import './table.css';
import { particles } from '../particles';
import logo from '../../images/logo.png';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
    this.renderItems = this.renderItems.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.particlesJS('particles', particles);

    let socket = window.io();

    socket.on('topCompanies', (topCompanies) => {
      this.setState({ companies: topCompanies.companies });
    });
  }

  renderItems() {
  }

  render() {
    return null;
  }
}

export default Table;
