import React, { Component } from 'react';
import './score.css';
import srce from '../../images/srce_plavo.png';
import logo from '../../images/logo.png';
import { Redirect } from 'react-router';

class Score extends Component {


  share() {
    window.FB.ui({
      method: 'feed',
      link: 'http://careerdate.fer.hr/',
      caption: 'My career match with ' + this.props.location.query.company + ' ' + this.props.location.query.score + '%',
    }, res => window.location.pathname = "/match");
  }

  render() {
    if (!this.props.location.query || !this.props.location.query.score) {
      return <Redirect to="/match" />
    }

    const score = parseInt(this.props.location.query.score, 10);
    console.log(score)
    return <div id="container">
      <div id="contentContainer">
        <div style={{ position: 'relative', display: 'flex', padding: '20px', paddingBottom: 0 }}>
          <img src={logo} alt="" style={{ width: 'auto', height: '70px' }} />
          <h1 style={{ fontWeight: 400, display: 'inline-block', marginTop: '10px', marginBottom: '45px' }} className="header2">Your career match</h1>
        </div>
        <div id="imageContainer">
          <img className="image"
            alt={this.props.location.query.name}
            style={{ borderRadius: "30px", marginRight: "20px" }}
            src={this.props.location.query.userUrl} />
          <span className="plus">@</span>
          <img className="image"
            alt={this.props.location.query.company}
            style={{ marginLeft: "10px" }}
            src={this.props.location.query.logoUrl} />
        </div>
        <label style={{ color: 'grey', position: 'absolute', width: '100%', left: 0, bottom: '10px' }}>
          {(score > 35) ? "Not bad." : "Life goes on."}<br />
          For real matches wisit us at: <a className="csd-link" href="http://careerdate.fer.hr/">Career speed dating</a>.</label>
      </div>
      <div className="loader2">
        <div style={{ width: "100%", backgroundColor: "#ed1c24", top: ((99 - score) + '%'), height: (score + '%'), position: "absolute" }}>
          <div className="sc" style={{ backgroundColor: "white", width: "100%" }} />
        </div>
        <div style={{ backgroundColor: "white", width: "100%", height: ((100 - score) + '%'), position: "absolute" }} />
        <img className="srce" src={srce} alt="" />
        <h1 style={{ position: "absolute", top: "43px", color: "black", fontWeight: 400 }}>{score}%</h1>
      </div>
      <a id="backLink" onClick={this.share.bind(this)}>Share on Facebook</a>
    </div >
  }
}

export default Score;
