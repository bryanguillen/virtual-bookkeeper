import React from 'react';
import './styles/UserHistory.css';
import MonthAndYear from './MonthAndYear';
import axios from 'axios';

export default class UserHistory extends React.Component {
	constructor (props){
		super (props);
		this.state = {
			userHistory: null,
			clicked: false
		};
		this.getUserHistory = this.getUserHistory.bind(this); 
		this.closeUserHistory = this.closeUserHistory.bind(this);
	}

	getUserHistory (e) {
		e.preventDefault();

		axios 
			.get(`/users/594dd4d447f990bb6450622a/history`)
			.then(response => {
				let userData = response.data;
				let userHistory = [];
				for (let i=0; i<userData.length; i++) {
					let month = userData[i].month,
						year = userData[i].year;

					let monthAndYear = < MonthAndYear month={month} year={year} />
					userHistory.push(monthAndYear);  
				} 
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

	render() {
		const state = this.state;


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