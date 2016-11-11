import React, { Component } from 'react';
import './Panel.css';
import srce from './srce.png';

export default class Item extends Component{
    render(){
        return <div className="panelRow" key={this.props.id}>
            <div style={{textAlign: "left"}}>
            <span style={{ width: "30%"}}>{this.props.name}  </span><span style={{ color: "black", fontWeight: "600", width: "30%"}}>{this.props.company}</span></div>
            <div>
                {/* <div style={{marginTop: "-25px", marginLeft: "90%", width: "45px", height: "34px", backgroundColor: "#e74b56"}}/>
                <div style={{ marginTop: "-35px", marginLeft: "90%", width: "45px", height: this.props.color, backgroundColor: "white"}}/>
                <img src={srce} alt="" height="36" width="45" style={{ marginTop: -this.props.color, marginLeft: "90%",}}/>
                <h5 style={{ marginTop: "-35px",marginLeft: "91%", color: "black" }}>{this.props.score}%</h5>
                <img src={srce} height="36" width="45" style={{ marginTop: -this.props.color, marginLeft: "90%"}}/>
                <h5 style={{ marginTop: "-35px",marginLeft: "91%", color: "black" }}>{this.props.score}%</h5> */}
                <div className="loader">
                    <div  style={{ backgroundColor: "#ed7880", width: "100%", top: ((100 - this.props.color) + '%'), height: (this.props.color+ '%'), position: "absolute"}}/>
                    <img src={srce} style={{position: "absolute", top: "1px", width: "50px", height: "50px"}} />
                    <h5 style={{position: "absolute", top: "-10px", color: "black", fontWeight: 400}}>{this.props.score}%</h5>
                </div>
            </div>
            </div>;
    }
}
