import React from 'react';
import './styles/UserHistory.css';
import MonthAndYear from './MonthAndYear';
import Record from './Record';
import componentHelper from './helper/helper';
import axios from 'axios';

export default class UserHistory extends React.Component {
	constructor (props){
		super (props);
		this.state = {
			userHistory: null,
			clicked: false,
			viewMonth: false,
			monthSummary: null
		};
		this.getUserHistory = this.getUserHistory.bind(this); 
		this.closeUserHistory = this.closeUserHistory.bind(this);
		this.closeMonth = this.closeMonth.bind(this);
		this.clickMonth = this.clickMonth.bind(this);
	}

	getUserHistory (e) {
		e.preventDefault();

		axios 
			.get(`/users/5951d945431e898b88e9efd6/history`)
			.then(response => {
				let userData = response.data;
				let userHistory =  userData.map((userData, index) => {
					return <MonthAndYear onClick={this.clickMonth} 
								key={index} month={userData.month} 
								year={userData.year}
								dataYear={userData.year} dataMonth={userData.month} /> //new piece of code
				})				
				this.setState( prevState => ({ 
					userHistory,
					clicked: !prevState.clicked
				}));
			})
			.catch(err => {
				console.log(err);
			})
	}

	closeUserHistory (e) {
		e.preventDefault();
		this.setState(prevState => ({
			userHistory: null,
			clicked: !prevState.clicked
		}))
	}

	closeMonth (e) {
		e.preventDefault();
		this.setState(prevState => ({
			monthSummary: null,
			viewMonth: !prevState.viewMonth
		}))	
	}

	clickMonth (e) {
		e.preventDefault();
		let monthData = e.target.getAttribute('data-month'),
			month = componentHelper.fullMonthAcronym(monthData),
		 	year = e.target.getAttribute('data-year');
		
		axios
			.get(`/users/5951d945431e898b88e9efd6/${month}/${year}`)
			.then(response => {
				let userData = response.data,
					expenditures = userData.expenditures;

				let monthSummary = expenditures.map(function (expenditure, index) {
					return <Record 
								key={index}
								expenseName={expenditure.expenseName}
								amount={expenditure.amount} />
				})

				this.setState(prevState => ({
					monthSummary,
					viewMonth: !prevState.viewMonth
				})) 
			})
	}

	render() {
		const state = this.state;

		if (state.viewMonth) {
			return (
				<div className="row">
					<div className="col-md-12">
						<span className="close-history" onClick={this.closeMonth}>
							Close Month
						</span>
					</div>
					{state.monthSummary}
				</div>
			);
		}


		if (state.clicked) {
			return (
				<div className="row">
					<div className="col-md-12">
						<span className="close-history" onClick={this.closeUserHistory}>
							Close User History
						</span>
					</div>
					{state.userHistory}
				</div>	
			);
		}

		return (
			<div className="row">
				<div className="col-md-6">
					<span className="get-history-link" onClick={this.getUserHistory}>
						See Expenses History
					</span>
				</div>
			</div>
		);
	}
}