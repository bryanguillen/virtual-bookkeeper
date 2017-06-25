import React from 'react';
import './styles/UserMonth.css';
import Expenditure from './Expenditure';
import axios from 'axios';

export default class UserMonth extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			//this is where the expenditures and 
			//their amounts go. 
			//I need the month and then send it to the server to get the right stuff
			//for now lets do dummy data. 
			expenditures: null
		}
	}
// <Expenditure expenseName={nameOfExpense} amount={expenseAmount} />
	componentDidMount() {
		axios
			.get(`/users/594dd4d447f990bb6450622a`)
			.then(response => {
				let userData = response.data,
				 	expenditures = userData.expenditures;
				
				let userExpenditures = expenditures.map((expenditure, index) => {
					return <Expenditure key={index} expenseName={expenditure.expenseName} amount={expenditure.amount} />
				});
				
				this.setState({ expenditures: userExpenditures });
			})
			.catch(err => {
				console.log(err);
			})
	}

	render (){
		const state = this.state;

		return (
		<div className="container">
			<div className="row">
				{state.expenditures}
			</div>
		</div>
		);
	}
} 