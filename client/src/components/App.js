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

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.saveStatEdit = this.saveStatEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    this.state = {
      expenseName: '',
      amount: '',
      username: null,
      income: null, 
      goal: false,
      expenses: null,
      netIncome: null,
      editMode: false,
      errorMessage: '',
      editError: false,
      newExpenseError: false
    }
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
      [e.target.name]: e.target.value,
      editError: false, 
      newExpenseError: false
    });
  }

  handleEditClick (e) {
    e.preventDefault();
    let formattedIncome = this.state.income.slice(1),
        formattedGoal = this.state.goal.slice(1)
    this.setState(prevState => ({
      editMode: !prevState.editMode,
      income: formattedIncome,
      goal: formattedGoal
    }))
  }

  saveStatEdit (e) {
    e.preventDefault();
    let monthAndYear = componentHelper.getMonth(),
      formattedIncome = componentHelper.convertOnSubmission(this.state.income),
      formattedGoal = componentHelper.convertOnSubmission(this.state.goal);
    
    if (!formattedIncome || !formattedGoal) {
          return this.setState( prevState => ({
                    editError: !prevState.editError,
                    errorMessage: 'Please Include valid format.' + prevState.errorMessage 
                  }))
    }

    axios
      .put(`/users/5951d945431e898b88e9efd6/${monthAndYear.month}/${monthAndYear.year}`, {
        user: '5951d945431e898b88e9efd6',
        month: monthAndYear.month,
        year: monthAndYear.year,
        income: formattedIncome,
        goal: formattedGoal
      })
      .then(() => {
        this.setState( (prevState) => ({ 
          editMode: !prevState.editMode,
          income: componentHelper.numToStringDollar(formattedIncome),
          netIncome: componentHelper.numToStringDollar(formattedIncome - componentHelper.amountStringToNum(prevState.expenses)),
          goal: componentHelper.numToStringDollar(formattedGoal),
          editError: false, 
          errorMessage: ''
         }))
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  handleSubmit (e) {
    e.preventDefault();
    let state = this.state,
        monthAndYear = componentHelper.getMonth(),
        amount = componentHelper.convertOnSubmission(state.amount),
        expenses = componentHelper.amountStringToNum(state.expenses),
        netIncome = componentHelper.amountStringToNum(state.netIncome);

    if (!amount) {
      return this.setState( prevState => ({
                newExpenseError: !prevState.newExpenseError,
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
          netIncome: componentHelper.numToStringDollar(netIncome - amount),
          newExpenseError: false, 
          errorMessage: ''
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
                  
                  <div className="row financial-stats-wrapper">
                    
                    <FinancialStat 
                      description={'Savings Goal'} 
                      value={state.goal}
                      editing={state.editMode}  
                      onChange={this.handleInputChange} name={'goal'} edible={true} />

                    <FinancialStat 
                      description={'Income '} 
                      value={state.income}
                      editing={state.editMode} 
                      onChange={this.handleInputChange} name={'income'} 
                      edible={true} />
                    
                    <FinancialStat description={'Expenses '} value={state.expenses}/>
                    
                    <FinancialStat description={'Net Income '} value={state.netIncome}/>
                    
                    <ErrorMessage error={state.editError} message={state.errorMessage} />
                  </div>

                  <div className="row button-wrapper">
                    <EditStatButton 
                      editing={state.editMode} 
                      editOnClick={this.handleEditClick}
                      saveOnClick={this.saveStatEdit} />
                  </div>  
                  
                  <ExpenseForm onSubmit={this.handleSubmit} onChange={this.handleInputChange} 
                    amountFieldName={'amount'} amount={state.amount} 
                    expenseFieldName={'expenseName'} 
                    expenseName={state.expenseName} />
                  <ErrorMessage error={state.newExpenseError} message={state.errorMessage} />
                    
                  <UserHistory />
                
                </div>
              </div>
          </div>
      </div>
    );
  }
}