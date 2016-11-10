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
  }

  responseFacebook(res) {
    const user = {
      name: res.name,
      picture: res.picture.data
    };

    this.setState({
      user
    });
  }

  sendData() {
    const data = {
      username: this.state.user.name,
      companyName: this.state.currentCompany
    };

    console.log('sendData');

    // TODO send data using fetch
  }

  componentWillMount() {
    fetch('/companies').then(res => {
      const promise = res.json();

      promise.then(value => {
        console.log('value ', value);
        this.setState({
          companies: value
        });
      }, err => {
        console.log('err', err);
      });
    });
  }

  renderOptions() {
    return this.state.companies.map(com => <option value={com.companyName}>{com.companyName}</option>);
  }

  render() {
    console.log('U render', this.state);

    return <div>
      <FacebookLogin
        appId="363015760698558"
        autoLoad={true}
        fields="name,picture"
        callback={this.responseFacebook}
      />
      <h3>Hello {this.state.user.name} </h3>
      <select name="companyName" onChange={this.setCompany}>
        {this.renderOptions()}
      </select>
      <input type="hidden" name="username" value={this.state.user.name}/>
      <button onClick={this.sendData}>Send</button>
    </div>
  }

}

export default Form;
