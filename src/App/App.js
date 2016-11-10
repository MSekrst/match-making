import React, { Component } from 'react';
import Panel from '../Panel/Panel';
import Home from '../Home/Home';
import Form from '../Form/Form';
import { Match, Miss, BrowserRouter as Router } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Match exactly pattern="/" component={Home} />
            <Match exactly pattern="/super-secret-route" component={Panel} />
            <Match exactly pattern="/match" component={Form}/>
            <Miss render={() => <div className="miss"><h2>404 sorry</h2></div>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
