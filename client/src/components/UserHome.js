import React from 'react';
import './styles/App.css';
import UserStats from './UserStats';
import ExpenseForm from './ExpenseForm';
import UserHistory from './UserHistory';
import componentHelper from './helper/helper';
import axios from 'axios';

export default class UserHome extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      expenseName: '',
      amount: 0,
      username: null,
      income: null, 
      goal: false,
      expenses: null,
      netIncome: null,
      editMode: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editStats =this.editStats.bind(this);
    this.saveStats = this.saveStats.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/users/5951d945431e898b88e9efd6`) //how to get this value dynamically?
      .then(response => {

        let userData = response.data,
            financialValues = ['income', 'expenses', 'goal', 'netIncome'],
            dollarStrings = {};

        Object.keys(userData.month).forEach(function (field) {
            let monthlyValue = userData.month[field];
            if (financialValues.includes(field)) {
              let newVal = componentHelper.numToStringDollar(monthlyValue);
              dollarStrings[field]= newVal;
            }
        })

        this.setState({
          username: userData.username,
          income: dollarStrings.income,
          expenses: dollarStrings.expenses,
          goal: dollarStrings.goal,
          netIncome: dollarStrings.netIncome
        })

      })
      .catch(err => {
        console.log(err);
      })
  }

  handleInputChange (e) {
    if (e.target.name === 'amount') {
      //some how only allow user to enter numbers
      this.setState({
        amount: componentHelper.convertUserInput(e.target.value)
      })
    }
    
    if (e.target.name !== 'amount') {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

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
    let state = this.state,
        monthAndYear = componentHelper.getMonth(),
        amount = componentHelper.dollarStringToNum(state.amount),
        expenses = componentHelper.dollarStringToNum(state.expenses),
        netIncome = componentHelper.dollarStringToNum(state.netIncome);
    
    axios
      .put(`/users/5951d945431e898b88e9efd6/${monthAndYear.month}/${monthAndYear.year}/new-expenditure`, {
        user: '5951d945431e898b88e9efd6',
        month: monthAndYear.month,
        year: monthAndYear.year,
        amount,
        expenseName: state.expenseName
      })
      .then(() => {
        this.setState( (prevState) => ({ 
          expenseName: '',
          amount: 0,
          expenses: componentHelper.numToStringDollar(expenses + amount),
          netIncome: componentHelper.numToStringDollar(netIncome - amount)
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
                  <UserStats username={state.username} monthlyIncome={state.income}
                  monthlySpend={state.expenses} netIncome={state.netIncome} 
                  monthlyGoal={state.goal} onChange={this.handleInputChange} 
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