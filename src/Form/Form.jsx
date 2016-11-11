import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';

import logo from '../../images/logo.png';
import './form.css';

class Form extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      active: ''
    };

    this.setCompany = this.setCompany.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getCompany = this.getCompany.bind(this);
  }

  setCompany(i) {
    if (!i) {
      this.setState({
        active: ''
      });
    } else {
      this.setState({
        active: i.value
      });
    }
  }

  componentWillMount() {
    fetch('/companies').then(res => {
      const promise = res.json();

      promise.then(value => {
        value = value.map(x => ({value: x.companyName, label: x.companyName, img: x.logoUrl}));
        this.setState({
          companies: value
        });
      }, err => {
      });
    });
  }

  sendData() {
    const company = this.getCompany();

    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
      }
      else {
        window.FB.login();
      }

      if (company) {
        window.FB.api('/me?fields=name,picture.type(large)', (res) => {

          const body = {
            username: res.name,
            companyName: company
          };

          fetch('/match', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
              window.location.pathname = '/';
          });
        });
      } else {
        console.log('Company not set');
      }
    });
  }

  getCompany() {
    return this.state.active || '';
  }

  render() {
    return <div id="formDiv">
      <img id="logo" src={logo} alt="Career Speed Dating"/>
      <Select className="selector"
        name="companies"
        value={this.state.active }
        options={this.state.companies}
        optionRenderer={(item) =>
        <div className="selectCompany">
          <img src={item.img} alt="" className="optionImage"/>
          <span className="companyName">{item.label}</span>
        </div>}
        onChange={this.setCompany}
      />
      <br />
      <div id="sendContainer" onClick={this.sendData}>Send</div>
    </div>
  }
}

export default Form;
