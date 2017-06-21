import React, { Component } from 'react';
import './styles/App.css';
import Greetings from './Greetings';
import UserStats from './UserStats';
import ExpenseInput from './ExpenseInput';

class App extends Component {
  render() {
    return (
      <div className="outer">
          <div className="inner">
              <div className="container">
                  <div className="app-wrapper">
                  <Greetings username={'demoUser123'} />
                  <UserStats />  
                  <ExpenseInput />
              </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
