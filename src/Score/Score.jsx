import React, {Component} from 'react';
import './score.css';
import srce from '../../images/srce_plavo.png';
import logo from '../../images/logo.png';

class Score extends Component {

  render() {
    const score = parseInt(this.props.location.query.score, 10);

    return <div id="container">
      <div id="contentContainer">
        <img src={logo} alt="" width="80px" style={{position: "absolute", left: "0", top: "12%"}}/>
        <h1 style={{ fontWeight: 400}} className="header2">Your career match:</h1>
        <div id="imageContainer">
        <img className="image"
             alt={this.props.location.query.name}
             style={{ borderRadius: "30px", marginRight: "20px"}}
             src={this.props.location.query.userUrl}/>
        <span className="plus">+</span>
        <img className="image"
             alt={this.props.location.query.company}
             style={{ marginLeft: "20px"}}
             src={this.props.location.query.logoUrl}/>
          </div>
      </div>
      <div className="loader2">
        <div style={{ backgroundColor: "#ed1c24", width: "100%", opacity: 0.9, top: ((100 - score) + '%'), height: (score + '%'), position: "absolute"}}/>
        <div style={{ backgroundColor: "whitesmoke", width: "100%", height: ((100 - score) + '%'), position: "absolute"}}/>
        <img className="srce" src={srce} alt=""/>
        <h1 style={{position: "absolute", top: "43px", color: "black", fontWeight: 400}}>{score}%</h1>
      </div>
    </div>
  }
}

export default Score;
