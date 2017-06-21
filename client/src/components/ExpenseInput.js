import React from 'react';
import './styles/ExpenseInput.css';

export default class ExpenseInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expenseName: '',
			amount: 0
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
		// let expenseNameSubmitted = this.state.expenseName;
		// let amountSubmitted = this.state.amount;
    	// here we take the input and send it to the server.
    	this.setState({ 
    		expenseName: '',
    		amount: 0
    	})
	}

	render(){
		return (
			<div className="expense-input-wrapper row">
				<div className="col-md-12">	
					<form name="expense-form" onSubmit={this.handleSubmit}>
						<label className="expense-field">
							Expense Name
							<input 
							name="expense-name" 
							type="text" 
							value={this.state.expenseName} 
							onChange={this.handleExpenseName} 
							className="expenses-form-input expense-name"
							required/>
						</label>
						<label className="expense-field">
							Expense Amount 
							<input 
							name="amount" 
							type="number" 
							value={this.state.amount} 
							onChange={this.handleAmount} 
							className="expenses-form-input amount"
							required/>
						</label>
						<div className="submit-expense-container">
							<button className="submit-expense" type="submit">Create Expense</button>
						</div>
					</form>;					
				</div>
			</div>
		);
	}
}