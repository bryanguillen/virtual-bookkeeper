import React from 'react';
import './styles/App.css';
import UserStats from './UserStats';
import ExpenseInput from './ExpenseInput';
//rename this to MainPage later on....
class App extends React.Component {
  render() {
    return (
      <div className="outer">
          <div className="inner">
              <div className="container">
                <div className="app-wrapper">
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
