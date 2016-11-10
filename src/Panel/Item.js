import React, { Component } from 'react';
import './Panel.css';
import srce from './srce.png';

export default class Item extends Component{
    render(){
        return <div className="panelRow" key={this.props.id}>
            {this.props.name} + FACEBOOK = {this.props.score}%
            <div style={{position: "absolute", right: 0, top: this.props.top+0.5, width: "45px", height: "33px", backgroundColor: "red"}}/>
            <div style={{position: "absolute", right: 0, top: this.props.top, width: "45px", height: this.props.color, backgroundColor: "white"}}/>
            <h5 style={{position: "absolute", right: 8, top: this.props.numberTop, color: "black"}}>{this.props.score}%</h5>
            <img src={srce} height="35" width="45" style={{position: "absolute", right: 0, top: this.props.top}}/>
            </div>;
    }
}