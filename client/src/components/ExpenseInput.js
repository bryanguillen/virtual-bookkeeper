import React from 'react';
import './styles/ExpenseInput.css';
//WORK IN PROGRESS!!!!!!!!!!!!!!!!!!

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
		console.log('The Input Submitted: ' + this.state.expenseName);
		console.log('The number Submitted: ' + this.state.amount);
	}

	render(){
		return (
			<div className="expense-input-wrapper">
				<form onSubmit={this.handleSubmit}>
					<label>
						Expense Name: 
						<input type="text" value={this.state.expenseName} onChange={this.handleExpenseName} />
					</label>
					<label>
						Expense Amount: 
						<input type="number" value={this.state.amount} onChange={this.handleAmount} />
					</label>
					<button type="submit">Create Expense</button>
				</form>
			</div>
		);
	}
}