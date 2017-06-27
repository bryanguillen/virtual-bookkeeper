import React from 'react';
import './styles/App.css';
import Greetings from './Greetings';
import FinancialStat from './FinancialStat';
import EditStatButton from './EditStatButton';
import ExpenseForm from './ExpenseForm';
import ErrorMessage from './ErrorMessage';
import UserHistory from './UserHistory';
import componentHelper from './helper/helper';
import axios from 'axios';

export default class UserHome extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      expenseName: '',
      amount: '',
      username: null,
      income: null, 
      goal: false,
      expenses: null,
      netIncome: null,
      editMode: false,
      errorMessage: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleStatEdit = this.handleStatEdit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.setState({
      errorMessage: '', 
      [e.target.name]: e.target.value
    });
  }

  //find an easier way to validate user input
  handleStatEdit (e) {
    e.preventDefault();
    let state = this.state,
        monthAndYear = componentHelper.getMonth(),
        formattedIncome = componentHelper.convertOnChange(state.income.slice(1)),
        formattedGoal = componentHelper.convertOnChange(state.goal.slice(1));

    if (state.editMode === true) {
      monthAndYear = componentHelper.getMonth();
      return axios
      .put(`/users/594dd4d447f990bb6450622a/${monthAndYear.month}/${monthAndYear.year}`, {
        user: '594dd4d447f990bb6450622a',
        month: monthAndYear.month,
        year: monthAndYear.year,
        income: formattedIncome,
        goal: formattedGoal 
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

    this.setState(prevState => ({
      editMode: !prevState.editMode
    }))

  }

  saveStatEdit (e) {
    e.preventDefault();
  }

  handleSubmit (e) {
    e.preventDefault();
    let state = this.state,
        monthAndYear = componentHelper.getMonth(),
        amount = componentHelper.convertOnChange(state.amount),
        expenses = componentHelper.amountStringToNum(state.expenses),
        netIncome = componentHelper.amountStringToNum(state.netIncome);

    if (!amount) {
      return this.setState( prevState => ({
                errorMessage: prevState.errorMessage + 'Please Include valid format.'
              }))
    }
    
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
          amount: '',
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
                  
                  <Greetings username={state.username} />
                  
                  <div className="row">
                    
                    <FinancialStat 
                      description={'Income '} 
                      value={state.income}
                      editing={state.editMode} 
                      onChange={this.handleInputChange} name={'income'} 
                      edible={true} />
                    
                    <FinancialStat description={'Expenses '} value={state.expenses}/>
                    
                    <FinancialStat description={'Net Income '} value={state.netIncome}/>
                    
                    <FinancialStat 
                      description={'Savings Goal'} 
                      value={state.goal}
                      editing={state.editMode}  
                      onChange={this.handleInputChange} name={'goal'} edible={true} />
                    
                    <EditStatButton editing={state.editMode} onClick={this.handleStatEdit} />
                  
                  </div>  
                  
                  <ExpenseForm onSubmit={this.handleSubmit} onChange={this.handleInputChange} 
                    amountFieldName={'amount'} amount={state.amount} 
                    expenseFieldName={'expenseName'} 
                    expenseName={state.expenseName} />
                  <ErrorMessage message={state.errorMessage} />
                  <UserHistory />
                </div>
              </div>
          </div>
      </div>
    );
  }
}