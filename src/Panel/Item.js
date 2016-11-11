import React, { Component } from 'react';
import './panel.css';
import srce from '../../images/srce.png';

export default class Item extends Component{
    render() {
        return <div className="panelRow" key={this.props.id}>
            <div style={{textAlign: "left"}}>
                <span style={{width: "30%"}}>{this.props.name}  </span><span
                style={{color: "black", fontWeight: "600", width: "30%"}}>{this.props.company}</span></div>
            <div>
                <div className="loader">
                    <div style={{
                        backgroundColor: "#ed7880",
                        width: "100%",
                        top: ((100 - this.props.color) + '%'),
                        height: (this.props.color + '%'),
                        position: "absolute"
                    }}/>
                    <img src={srce} alt="" style={{position: "absolute", top: "1px", width: "50px", height: "50px"}}/>
                    <h5 style={{position: "absolute", top: "-10px", color: "black", fontWeight: 400}}>{this.props.score}%</h5>
                </div>
            </div>
        </div>;
    }
}
