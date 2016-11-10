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
        // this.sortRotate = this.sortRotate.bind(this);
    }

    componentWillMount() {
      fetch('/tables/matches').then((res) => {
        const promise = res.json();

        promise.then(value => {
          this.setState({
            articles: value
          }, err => {
            console.log('ERR PROMISE', err);
          });
        });
      }, (err) => {
        console.log('ERR', err);
      });
    }

    componentDidMount() {
        window.particlesJS('particles', particles);
    }

    // sortRotate() {
    //     const articles = [
    //         { id: 'a', index:'1', score:'98', timestamp: 811396800000, name: 'Bruna' },
    //         { id: 'm', index:'2', score:'90', timestamp: 1108702800000, name: 'Tea' },
    //         { id: 'b', index:'3', score:'87', timestamp: 1108702800000, name: 'Frane' },
    //         { id: 'c', index:'4', score:'82', timestamp: 1156564800000, name: 'Donat' },
    //         { id: 'd', index:'5', score:'80', timestamp: 1256443200000, name: 'Matija' },
    //         { id: 'e', index:'6', score:'75', timestamp: 1286942400000, name: 'Luka' },
    //         { id: 'f', index:'7', score:'66', timestamp: 1331697600000, name: 'Petra' },
    //         { id: 'g', index:'8', score:'65', timestamp: 1369800000000, name: 'Josipa' },
    //         { id: 'h', index:'9', score:'60', timestamp: 811396800000, name: 'Bruna' },
    //         { id: 'i', index:'10', score:'55', timestamp: 1108702800000, name: 'Frane' },
    //     ]
    //
    //     this.setState({
    //         articles
    //     });
    // }

    renderItems(){
        return this.state.articles.map(item => <Item key={item._id} name={item.username.toUpperCase()} top={(item.index-1)*60+5} numberTop={(item.index-1)*60-12} color={(1-item.score/100)*35} score={item.score} />)
    }

    render() {
        return (
            <div className="Panel">
                <div className="panel">
                    <div id="particles"/>
                    <img src={logo} width="230" style={{position: "absolute", left: 0, top: 0}}/>
                    <img src={logo} width="230" style={{position: "absolute", right: 0, bottom: 0}}/>
                    <div id="panelDiv">
                        <div id="panelHeader">
                            <h1 className="header">NAJBOLJI REZULTATI</h1>
                        </div>
                        {/*<button onClick={() => this.sortRotate()}>Change</button>*/}
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
