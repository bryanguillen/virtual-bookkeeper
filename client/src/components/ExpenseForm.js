import React from 'react';
import './styles/ExpenseForm.css';

export default class ExpenseInput extends React.Component {
	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e) {
		this.props.onChange(e);
	}

	render(){
		return (
			<div className="expense-input-wrapper row">
				<div className="col-md-12">	
					<form name="expense-form" onSubmit={this.props.onSubmit}>
						<label className="expense-field">
							Expense Name
							<input 
							name={this.props.expenseFieldName} 
							type="text" 
							value={this.props.expenseName} 
							onChange={this.handleChange} 
							className="expenses-form-input expense-name"
							required/>
						</label>
						<label className="expense-field">
							Expense Amount 
							<input 
							name={this.props.amountFieldName} 
							type="text" 
							value={this.props.amount} 
							onChange={this.handleChange} 
							className="expenses-form-input amount"
							required/>
						</label>
						<div className="submit-expense-container">
							<button className="submit-expense" type="submit">Create Expense</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}