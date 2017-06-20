import React from 'react';
import './styles/ExpenseInput.css';
//WORK IN PROGRESS!!!!!!!!!!!!!!!!!!

export default class ExpenseInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			expenseName: ''
		}
	
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange (e) {
		this.setState({ expenseName: event.target.value });
	}

	handleSubmit (e) {
		e.preventDefault();
		console.log('The Input Submitted: ' + this.state.expenseName);
	}

	render(){
		return (
			<div className="expense-input-wrapper">
				<form onSubmit={this.handleSubmit}>
					<label>
						Expense Name: 
						<input type="text" value={this.state.expenseName} onChange={this.handleInputChange} />
					</label>
					<label>
						Expense Amount: 
						<input type="number" value={this.state.value} onChange={this.handleInputChange} />
					</label>
				</form>
			</div>
		);
	}
expenseName