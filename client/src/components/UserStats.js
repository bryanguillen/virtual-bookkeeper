import React from 'react';
import FinancialStat from './FinancialStat';
import axios from 'axios';

//you are going to need to make this into a stateful comp
//for getting data from the server... 

export default class UserStats extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			monthlyIncome: null, 
			monthlySpend: null, 
			netIncome: null ,
			monthlyGoal: null
		} 
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		axios
			.get(`/users/58ef96d7a1ef2e629502193f`) //how to get this value dynamically?
			.then(response => {
				let userData = response.data; //actual data obj 
				this.setState({
					monthlyIncome: userData.monthlyIncome,
					monthlySpend: userData.monthlySpend,
					netIncome: userData.netIncome,
					monthlyGoal: userData.monthlyGoal
				})
			})
			.catch(err => {
				console.log(err);
			})
	}

	render () {
		return (
			<div className="row">
		        <FinancialStat description={'Income '} value={this.state.monthlyIncome}/>
                <FinancialStat description={'Expenses '} value={this.state.monthlySpend}/>
                <FinancialStat description={'Net Income '} value={this.state.netIncome}/>
                <FinancialStat description={'Goal For Month'} value={this.state.monthlyGoal}/>
			</div>		
		);
	}
}  