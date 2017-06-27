import React from 'react';
import './styles/Record.css';

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
			<div className="col-md-4 col-xs-6 expenditure" >
				<span>{this.props.expenseName}</span><span>{this.props.amount}</span>
				<
					span 
					onClick={this.props.deleteOnClick}
					data-id={this.props.dataId} 
					data-month={this.props.dataMonth} 
					data-year={this.props.dataYear}
				>
					Delete
				</span>
			</div>	
		);
	}
}