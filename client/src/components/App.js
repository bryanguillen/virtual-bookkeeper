import React from 'react';
import './styles/App.css';
import UserStats from './UserStats';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      expenseName: '',
      amount: 0,
      username: null,
      monthlyIncome: null, 
      editMode: false,
      monthlySpend: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editStats =this.editStats.bind(this);
    this.saveStats = this.saveStats.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
    axios
      .get(`/users/58ef96d7a1ef2e629502193f`) //how to get this value dynamically?
      .then(response => {
        let userData = response.data; //actual data obj 
        this.setState({
          username: userData.username,
          monthlyIncome: userData.monthlyIncome,
          monthlySpend: userData.monthlySpend,
          monthlyGoal: userData.monthlyGoal
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  editStats(e) {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  saveStats (e) {
    e.preventDefault();
    let state = this.state;
    axios
      .put(`/users/58ef96d7a1ef2e629502193f/finances`, {
        monthlyIncome: state.monthlyIncome,
        monthlySpend: state.monthlySpend,
        netIncome: state.netIncome,
        monthlyGoal: state.monthlyGoal 
      })
      .then(() => {
        console.log('success!');
        this.setState( prevState => ({
          editMode: !prevState.editMode //you might want a way to take the error and display it to user
        }))
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSubmit (e) {
    e.preventDefault();
    axios
      .post(`/users/58ef96d7a1ef2e629502193f/expenditures`, {
        user: '58ef96d7a1ef2e629502193f',
        amount: this.state.amount,
        expenseName: this.state.expenseName
      })
      .then(response => {
        let userData = response.data;
        //so on top of that what you want to do here is
        //dynamically change the expenses dynamically here or 
        //return something else in the backend. 
        this.setState( (prevState) => ({ 
          expenseName: '',
          amount: 0,
          monthlySpend: prevState.monthlySpend + userData.amount
        }))
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  render() {
    let state = this.state;


    return (
      <div className="outer">
          <div className="inner">
              <div className="container">
                <div className="app-wrapper">
                  <UserStats username={state.username} monthlyIncome={state.monthlyIncome}
                  monthlySpend={state.monthlySpend} netIncome={state.monthlyIncome - state.monthlySpend} 
                  monthlyGoal={state.monthlyGoal} onChange={this.handleInputChange} 
                  onClick={this.saveStats} />  
                  <ExpenseForm onSubmit={this.handleSubmit} onChange={this.handleInputChange} 
                    amountFieldName={'amount'} amount={this.state.amount} 
                    expenseFieldName={'expenseName'} 
                    expenseName={this.state.expenseName} />
                </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
