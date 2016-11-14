import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import 'whatwg-fetch';

import '../particles.js';
import './panel.css';
import Item from './Item';
import { particles } from '../particles';
import logo from '../../images/logo.png';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.renderItems = this.renderItems.bind(this);
  }

  componentWillMount() {
      fetch('/tables/matches').then((res) => {
        const promise = res.json();

        promise.then(value => {
          this.setState({
            articles: value
          });
        });
      });
    }

  componentDidMount() {
    window.particlesJS('particles', particles);
  }

  renderItems() {
    return this.state.articles.map(item => <Item key={item._id} name={item.username.toUpperCase()}
                                                 company={item.companyName.toUpperCase()}
                                                 top={(item.index - 1) * 60 + 5} numberTop={(item.index - 1) * 60 - 12}
                                                 color={(item.score)} score={item.score}/>)
  }

  render() {
    if (this.props.params.pass === 'tigrovi') {
      return (
        <div className="Panel">
          <div className="panel">
            <div id="particles"/>
            <img src={logo} alt="" width="230" style={{position: "absolute", left: 0, top: 0}}/>
            <div id="panelDiv">
              <div id="panelHeader">
                <h1 className="header" style={{ fontSize: "50px"}}>NAJBOLJI REZULTATI</h1>
              </div>
              <FlipMove id="panelDiv1" staggerDurationBy="30"
                        duration={500}
                        enterAnimation="elevator"
                        leaveAnimation="elevator">
                { this.renderItems()}
              </FlipMove>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Panel;
