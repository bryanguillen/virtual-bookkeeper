import React from 'react';

export default function Expenditure (props) {
	return (
		<div className="col-md-6">
			<span className="expense-name">{props.expenseName}</span>
			<span className="expense-amount">{props.amount}</span>
		</div> 
	);
} 