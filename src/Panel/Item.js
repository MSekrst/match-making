import React, { Component } from 'react';
import './panel.css';
import srce from '../../images/srce.png';

export default class Item extends Component {
    render() {
        return <div className="panelRow" key={this.props.id}>
            <div className="namees" style={{ textAlign: "left", fontSize: "30px", width: "100%" }}>
                <div style={{ width: "50%", display: "inline-block" }}>{this.props.name}  </div>
                <div className="cmpny" style={{ color: "black", display: "inline-block", fontWeight: "600", width: "50%" }}>{this.props.company}</div>
            </div>
            <div>
                <div className="loader">
                    <div style={{
                        backgroundColor: "#ed7880",
                        width: "100%",
                        top: ((100 - this.props.color) + '%'),
                        height: (this.props.color + '%'),
                        position: "absolute"
                    }} />
                    <img src={srce} alt="" style={{ position: "absolute", top: "1px", width: "50px", height: "50px" }} />
                    <h5 style={{ position: "absolute", top: "-10px", color: "black", fontWeight: "bold" }}>{this.props.score}%</h5>
                </div>
            </div>
        </div>;
    }
}
