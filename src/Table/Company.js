import React, { Component } from 'react';
import './table.css';

export default class Company extends Component {
    render() {
        return <div className="panelRow comp" key={this.props.id} style={{ marginBottom: "3%" }}>
            <div style={{ textAlign: "left", fontSize: "40px", width: "100%" }}>
                <div className="elipsis-comp" style={{ display: "inline-block", fontWeight: 400 }}>{this.props.name}  </div>
            </div>
            <div className="logoBest">
                <img src={this.props.image} alt="" style={{ position: "absolute", height: "60px", maxHeight: "50%", object: "contain" }} />
            </div>
        </div>;
    }
}
