import React, {Component} from 'react';
import './Score.css';
import srce from './srce.png';
import logo from '../../images/logo.png';

class Score extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div id="container">
      <div id="contentContainer">
        <img src={logo} width="80px" style={{position: "absolute", left: "0", top: "12%"}}/>
        <h1 style={{ fontWeight: 400}} className="header2">Your career match:</h1>
        <div id="imageContainer">
        <img className="image"
             style={{ borderRadius: "30px", marginRight: "20px"}}
             src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/14068102_10210545158653320_7356964510690281961_n.jpg?oh=67107f840ef93f320a65df68b40ff49d&oe=58D0AE0F"/>
        <span className="plus">+</span>
        <img className="image"
             style={{ marginLeft: "20px"}}
             src="http://logos-download.com/wp-content/uploads/2016/02/Microsoft_box.png"/>
          </div>
      </div>
      <div className="loader2">
        <div style={{ backgroundColor: "#ed1c24", width: "100%", opacity: 0.9, top: ((100 - 50) + '%'), height: (50+ '%'), position: "absolute"}}/>
        <div style={{ backgroundColor: "whitesmoke", width: "100%", height: (50+ '%'), position: "absolute"}}/>
        <img className="srce" src={srce} />
        <h1 style={{position: "absolute", top: "43px", color: "black", fontWeight: 400}}>50%</h1>
      </div>
    </div>
  }
}

export default Score;