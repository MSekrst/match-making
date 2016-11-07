import React, { Component } from 'react';
import Panel from '../Panel/Panel';
import Home from '../Home/Home';
import { Match, Miss, Link, BrowserRouter as Router } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Match exactly pattern="/" component={Home} />
            <Match exactly pattern="/super-secret-route" component={Panel} />
            <Miss render={() => <div className="miss"><h2>404 sorry</h2></div>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
