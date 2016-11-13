import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';
import { Redirect } from 'react-router';

import logo from '../../images/logo.png';
import './form.css';

class Form extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      active: '',
      activeUrl: '',
      warning: false
    };

    this.setCompany = this.setCompany.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getCompany = this.getCompany.bind(this);
    this.renderWarning = this.renderWarning.bind(this);
    this.renderCompanyLogo = this.renderCompanyLogo.bind(this);
  }

  setCompany(i, u, t) {
    if (!i) {
      this.setState({
        active: '',
        warning: true,
        activeUrl: ''
      });
    } else {
      this.setState({
        active: i.value,
        warning: false,
        activeUrl: i.img
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
      });
    });
  }

  sendData() {
    const company = this.getCompany();

    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
      }
      else {
        window.FB.login();
      }

      if (company) {
        window.FB.api('/me?fields=name,picture.type(large)', (fbData) => {

          const body = {
            username: fbData.name,
            companyName: company
          };

          fetch('/match', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            const promise = res.json();

            promise.then(data => {
              this.setState({
                params: {
                  userUrl: fbData.picture.data.url,
                  score: data.score,
                  logoUrl: data.logoUrl,
                  name: fbData.name,
                  company: data.companyName
                }
              });
            });
          });
        });
      } else {
        this.setState({
          warning: true
        });
      }
    });
  }

  getCompany() {
    return this.state.active || '';
  }

  renderWarning() {
    if (this.state.warning) {
      return <div id="warning">
        Please select a company to match with
      </div>
    }
  }

  renderCompanyLogo() {
    if (this.state.activeUrl) {
      return <img id="currentLogo" src={this.state.activeUrl} alt={this.state.active}/>
    }
  }

  render() {
    if (this.state.params) {
      return <Redirect to={{
        pathname: '/score',
        query: this.state.params
      }}/>
    }

    return <div id="formDiv">
      <img id="logo" src={logo} alt="Career Speed Dating"/>
      {this.renderWarning()}
      <Select className="selector"
        name="companies"
        searchable={false}
        value={this.state.active}
        options={this.state.companies}
        optionRenderer={(item) =>
        <div className="selectCompany">
          <img src={item.img} alt="" className="optionImage"/>
          <span className="companyName">{item.label}</span>
        </div>}
        onChange={this.setCompany}
      />
      {this.renderCompanyLogo()}
      <br />
      <div id="sendContainer" onClick={this.sendData}>Send</div>
    </div>
  }
}

export default Form;
