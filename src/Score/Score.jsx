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
      picture: 'https://matchmaking.fer.hr/images/' + this.picture(),
      description: 'My match with ' + this.props.location.query.company + ' is ' + this.props.location.query.score
      + '%. For more details on the event visit this link. If you want to find out which company is compatible with YOU visit http://matchmaking.fer.hr',
      title: 'Career Speed Dating @ FER',
      caption: 'Can you beat my score? Find out at matchmaking.fer.hr',
    }, res => window.location.pathname = "/match");
  }

  picture() {
    if (!this.props.location.query || !this.props.location.query.score) {
      return 'share_good.png';
    }

    const score = this.props.location.query.score;

    if (score < 50) {
      return 'share_ok.png';
    } else if (score < 80) {
      return 'share_good.png';
    } else {
      return 'share_excellent';
    }
  }

  displayMessage(score) {
    if (score < 50) {
      return "Don't be sad. Try another company.";
    } else if (score < 80) {
      return 'Not bad at all.';
    } else {
      return 'Excellent!';
    }
  }

  render() {
    if (!this.props.location.query || !this.props.location.query.score) {
      return <Redirect to="/match" />
    }

    const score = parseInt(this.props.location.query.score, 10);
    return <div id="container" style={{ minHeight: window.innerHeight + 'px' }}>
      <div id="contentContainer">
        <div style={{ position: 'relative', display: 'flex', padding: '15px 10px 0 15px' }}>
          <img src={logo} alt="" style={{ width: 'auto', height: '60px' }} />
          <h1 style={{ fontWeight: 400, display: 'inline-block' }} className="header2">Your career match</h1>
        </div>
        <div id="imageContainer">
          <img className="image"
            alt={this.props.location.query.name}
            style={{ borderRadius: "30px", marginRight: "20px" }}
            src={this.props.location.query.userUrl} />
          <span className="plus">+</span>
          <img className="image"
            alt={this.props.location.query.company}
            style={{ marginLeft: "10px" }}
            src={this.props.location.query.logoUrl} />
        </div>
        <label style={{ color: 'grey', position: 'absolute', width: '100%', left: 0, bottom: '10px' }}>
          <strong style={{ color: '#ed1c24' }}>{this.displayMessage(score)}</strong><br />
          For real matches visit <a className="csd-link" href="http://careerdate.fer.hr/">Career Speed Dating</a><br />
          or <a className="csd-link" href="/match">try again</a>.
        </label>
      </div>
      <div className="loader2">
        <div style={{ width: "100%", backgroundColor: "#ed1c24", top: ((99 - score) + '%'), height: (score + '%'), position: "absolute" }}>
          <div className="sc" style={{ backgroundColor: "white", width: "100%" }} />
        </div>
        <div style={{ backgroundColor: "white", width: "100%", height: ((100 - score) + '%'), position: "absolute" }} />
        <img className="srce" src={srce} alt="" />
        <h1 style={{ position: "absolute", top: "43px", color: "black", fontWeight: 400, width: "100%" }}>{score}%</h1>
      </div>
      <div className="centerLink">
        <div id="backLink" onClick={this.share.bind(this)}>Share on Facebook</div>
      </div>
    </div >
  }
}

export default Score;
