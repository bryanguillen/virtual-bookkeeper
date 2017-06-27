import React from 'react';

export default class Record extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			editMode: false //just this for now
		}
		this.editExpenditure = this.editExpenditure.bind(this);
	}

	editExpenditure (e) {
		e.preventDefault();
		console.log('hello world!')
	}

	render() {	
		return (
			<div className="col-md-4">
				<span>{this.props.expenseName}</span><span>{this.props.amount}</span>
			</div>	
		);
	}
}