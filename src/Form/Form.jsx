import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import 'whatwg-fetch';

class Form extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      user: {},
      currentCompany: ''
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setCompany = this.setCompany.bind(this);
  }

  responseFacebook(res) {
    const user = {
      name: res.name,
      picture: res.picture.data
    };

    this.setState({
      user
    });

    const body = {

    };

    fetch('/match', {
      method: 'POST',
      body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      const promise = res.json();

      promise.then(value => {

      });
    });
  }

  sendData() {
    const data = {
      username: this.state.user.name,
      companyName: this.state.currentCompany
    };

    console.log('sendData', data);

    // TODO - send data using fetch
  }

  setCompany() {
    const select = document.getElementById('companySelector');

    const value = select.options[select.selectedIndex].value;

    this.setState({
      currentCompany: value
    });
  }

  componentWillMount() {
    fetch('/companies').then(res => {
      const promise = res.json();

      promise.then(value => {
        console.log('value ', value);
        this.setState({
          companies: value
        });

        this.setState({
          currentCompany: value[0].companyName || ''
        });
      }, err => {
        console.log('err', err);
      });
    });
  }

  renderOptions() {
    return this.state.companies.map(com => <option id={com._id} value={com.companyName}>{com.companyName}</option>);
  }

  render() {
    console.log('U render', this.state);

    return <div>
      <h3>Hello {this.state.user.name} </h3>
      <select name="companyName" id="companySelector" onChange={this.setCompany}>
        {this.renderOptions()}
      </select>
      <FacebookLogin
        appId="363015760698558"
        autoLoad={true}
        fields="name,picture"
        callback={this.responseFacebook}
      />
    </div>
  }

}

export default Form;
