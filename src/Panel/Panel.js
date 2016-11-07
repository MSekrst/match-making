import React, { Component } from 'react';
import 'particles.js';
import './Panel.css';

class Panel extends Component {

    componentDidMount() {
        window.particlesJS('particles', particles);
    }

    render() {
        return (
            <div className="Panel">
                <div>
                    <div id="particles" />
                    <h1>Panel</h1>
                </div>
            </div>
        );
    }
}


const particles = {
    "particles": {
        "number": {
            "value": 34,
            "density": {
                "enable": true,
                "value_area": 1603.4120608655228
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "image",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 6
            },
            "image": {
                "src": "http://www.hartsanitation.com/img/0994/929.png",
                "width": 1000,
                "height": 1000
            }
        },
        "opacity": {
            "value": 0.60764368405685,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 36.076771369474265,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ff0000",
            "opacity": 0,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};


export default Panel;