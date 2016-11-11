import React, { Component } from 'react';
import 'particles.js';
import './Panel.css';
import Item from './Item';
import { particles } from './particles.js';
import logo from './logo.png';

import FlipMove from 'react-flip-move';
import 'whatwg-fetch';

class Panel extends Component {

    constructor(props){
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

    renderItems(){
        return this.state.articles.map(item => <Item key={item._id} name={item.username.toUpperCase()} top={(item.index-1)*60+5} numberTop={(item.index-1)*60-12} color={(1-item.score/100)*35} score={item.score} />)
    }

    render() {
        return (
            <div className="Panel">
                <div className="panel">
                    <div id="particles"/>
                    <img src={logo} alt="" width="230" style={{position: "absolute", left: 0, top: 0}}/>
                    <img src={logo} alt="" width="230" style={{position: "absolute", right: 0, bottom: 0}}/>
                    <div id="panelDiv">
                        <div id="panelHeader">
                            <h1 className="header">NAJBOLJI REZULTATI</h1>
                        </div>
                        <FlipMove id="panelDiv1" staggerDurationBy="30"
                                  duration={500}
                                  enterAnimation="elevator"
                                  leaveAnimation="elevator" >
                        { this.renderItems()}
                        </FlipMove>
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
