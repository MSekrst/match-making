import React, { Component } from 'react';
import Panel from '../Panel/Panel';
import Promo from '../Promo/Promo';
import Form from '../Form/Form';
import Score from '../Score/Score';
import Table from '../Table/Table';
import { Match, Miss, BrowserRouter as Router, Redirect } from 'react-router';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Match exactly pattern="/" render={() => <Redirect to="/match" />} />
            <Match exactly pattern="/promo/:pass" component={Promo} />
            <Match exactly pattern="/table/matches/:pass" component={Panel} />
            <Match exactly pattern="/table/comapines/:pass" component={Table} />
            <Match exactly pattern="/match" component={Form} />
            <Match exactly pattern="/score" component={Score} />
            <Miss render={() => <div className="miss"><h2>404 sorry</h2></div>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
