import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Redirect } from 'react-router';
import Spinner from 'react-spinkit';
import logo from '../../images/logo.png';
import './form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      active: '',
      activeUrl: '',
      warning: false,
      user: null,
      isLoading: false
    };

    this.setCompany = this.setCompany.bind(this);
    this.getCompany = this.getCompany.bind(this);
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


  componentWillUnmount() {
    window.onfocus = null;
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

  componentDidMount() {
    document.addEventListener("fbLoad", () => this.render())
    window.onfocus = () => {
      this.setState({isLoading: false});
    }
  }

  doTheWork() {
    const company = this.getCompany();
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
              isLoading: false,
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
        warning: true,
        isLoading: false
      });
    }
  }

  getCompany() {
    return this.state.active || '';
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

    return (
      <div id="formDiv">
        <img id="logo" src={logo} alt="Career Speed Dating"/>
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
        <div className="logoContainer">
          {this.renderCompanyLogo()}
        </div>
        <br />
        <div style={{width: '100%', bottom: 0, height: '30%'}}>
          <div style={{color: 'grey', width: '90%', padding: '20px'}}>
            Select company and login with Facebook. We need only your name.
          </div>
          <button disabled={this.getCompany() === ''} id="sendContainer" onClick={() => {
            this.setState({isLoading: true});
            window.FB.login(() => {
              this.doTheWork()
            })
          } }>
            {!this.state.isLoading ? "Login with Facebook" : <Spinner spinnerName="three-bounce"/>}</button>
        </div>
      </div>
    )
  }
}

export default Form;
