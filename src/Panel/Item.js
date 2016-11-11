import React, { Component } from 'react';
import './Panel.css';
import srce from './srce.png';

export default class Item extends Component{
    render(){
        return <div className="panelRow" key={this.props.id}>
            <div style={{textAlign: "left"}}>
            {this.props.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FACEBOOK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.score}%
            </div>
            <div>
                <div style={{marginTop: "-25px", marginLeft: "90%", width: "45px", height: "34px", backgroundColor: "#e74b56"}}/>
                <div style={{ marginTop: "-35px", marginLeft: "90%", width: "45px", height: this.props.color, backgroundColor: "white"}}/>
                <img src={srce} alt="" height="36" width="45" style={{ marginTop: -this.props.color, marginLeft: "90%",}}/>
                <h5 style={{ marginTop: "-35px",marginLeft: "91%", color: "black" }}>{this.props.score}%</h5>
            </div>
            </div>;
    }
}
