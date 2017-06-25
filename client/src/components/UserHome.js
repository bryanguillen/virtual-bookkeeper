import React from 'react';
import './styles/App.css';
import UserStats from './UserStats';
import ExpenseForm from './ExpenseForm';
import UserHistory from './UserHistory';
import axios from 'axios';

export default class UserHome extends React.Component {
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
      .get(`/users/594dd4d447f990bb6450622a`) //how to get this value dynamically?
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
      .put(`/users/594dd4d447f990bb6450622a/finances`, {
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
      .post(`/users/594dd4d447f990bb6450622a/expenditures`, {
        user: '594dd4d447f990bb6450622a',
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
                  saveOnClick={this.saveStats} editOnClick={this.editStats}
                  editMode={state.editMode} />  
                  <ExpenseForm onSubmit={this.handleSubmit} onChange={this.handleInputChange} 
                    amountFieldName={'amount'} amount={this.state.amount} 
                    expenseFieldName={'expenseName'} 
                    expenseName={state.expenseName} />
                  <UserHistory />
                </div>
              </div>
          </div>
      </div>
    );
  }
}