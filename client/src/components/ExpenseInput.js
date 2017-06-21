import React from 'react';
import './styles/ExpenseInput.css';

export default class ExpenseInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expenseName: '',
			amount: 0,
			error: false
		}
	
		this.handleExpenseName = this.handleExpenseName.bind(this);
		this.handleAmount = this.handleAmount.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleExpenseName (e) {
		this.setState({ expenseName: e.target.value });
	}

	handleAmount (e) {
		this.setState({ amount: e.target.value });
	}

	handleSubmit (e) {
		e.preventDefault();
		let userInput = this.state.expenseName;
		if (userInput.trim().length === 0) {
			return this.setState(prevState => ({
      					error: !prevState.error
    				}));
    	}
    	//here we take the input and send it to the server.
    	this.setState({ 
    		expenseName: '',
    		amount: 0,
    		error: false
    	})
	}

	render(){
		let form =  <form onSubmit={this.handleSubmit}>
					    <label>
						    Expense Name: 
						    <input name="expense-name" type="text" value={this.state.expenseName} onChange={this.handleExpenseName} />
					    </label>
					    <label>
						    Expense Amount: 
						    <input name="amount" type="number" value={this.state.amount} onChange={this.handleAmount} />
					    </label>
					    <button type="submit">Create Expense</button>
				    </form>;
		let errorMessage = <span>You must fill out both fields!</span>;
		let error = this.state.error;
		if (error) {
			return (
				<div className="expense-input-wrapper">
					{errorMessage}
					{form}					
				</div>
			);
		}
		return (
			<div className="expense-input-wrapper">
				{form}					
			</div>
		);
	}
}