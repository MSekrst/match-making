import React, { Component } from 'react';
import 'particles.js';
import './Panel.css';
import Item from './Item';
import { particles } from './particles.js';

import FlipMove from 'react-flip-move';
import articles from './articles';


class Panel extends Component {

    constructor(props){
        super(props);
        this.state = {
            articles
        };
        this.renderItems = this.renderItems.bind(this);
        this.sortRotate = this.sortRotate.bind(this);
    }

    componentDidMount() {
        window.particlesJS('particles', particles);
    }

    sortRotate() {
        const articles = [
            { id: 'a', timestamp: 811396800000, name: 'Bruna' },
            { id: 'm', timestamp: 1108702800001, name: 'Tea' },
            { id: 'b', timestamp: 1108702800000, name: 'Frane' },
            { id: 'c', timestamp: 1156564800000, name: 'Donat' },
            { id: 'd', timestamp: 1256443200000, name: 'Matija' },
            { id: 'e', timestamp: 1286942400000, name: 'Luka' },
            { id: 'f', timestamp: 1331697600000, name: 'Petra' },
            { id: 'g', timestamp: 1369800000000, name: 'Josipa' }
        ]

        this.setState({
            articles
        });
    }

    renderItems(){
        return this.state.articles.map(item => <Item key={item.id} name={item.name} />)
    }

    render() {
        return (
            <div className="Panel">
                <div className="panel">
                    <div id="particles"/>
                    <div id="panelDiv">
                        <h1>Najbolji matchevi</h1>
                        <button onClick={() => this.sortRotate()}>Change</button>
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
