import React, { Component } from 'react';
import './Panel.css';

export default class Item extends Component{
    render(){
        return <div className="panelRow" key={this.props.id}>{this.props.name}</div>;
    }
}