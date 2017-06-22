import React from 'react';
import axios from 'axios';
import FinancialStat from './FinancialStat';
import Greetings from './Greetings';
import EditUserStats from './EditUserStats';
import SaveUserStats from './SaveUserStats';

export default class UserStats extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			username: null,
			monthlyIncome: null, 
			monthlySpend: null, 
			netIncome: null ,
			monthlyGoal: null,
			editMode: false
		} 
		this.componentDidMount = this.componentDidMount.bind(this);
		this.editStats = this.editStats.bind(this);
		this.handleStatEdit = this.handleStatEdit.bind(this);
		this.saveStats = this.saveStats.bind(this);
	}

	componentDidMount() {
		axios
			.get(`/users/58ef96d7a1ef2e629502193f`) //how to get this value dynamically?
			.then(response => {
				let userData = response.data; //actual data obj 
				this.setState({
					username: userData.username,
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


	editStats(e) {
		e.preventDefault();
		this.setState(prevState => ({
			editMode: !prevState.editMode
		}));
	}

	handleStatEdit (e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value })
	}

	saveStats (e) {
		e.preventDefault();
		let state = this.state;
		axios
			.put(`/users/58ef96d7a1ef2e629502193f/finances`, {
				monthlyIncome: state.monthlyIncome,
				monthlySpend: state.monthlySpend,
				netIncome: state.netIncome,
				monthlyGoal: state.monthlyGoal 
			})
			.then(() => {
				console.log('success!');
				this.setState( prevState => ({
					editMode: !prevState.editMode //you might want a way to take the error and display it to user
				}))
			})
			.catch(err => {
				console.log(err);
			})
	}

	render () {
		let state = this.state;
		//calculate dynamic net income and any other value for future references below. 
		let dynamicStats = { 
			netIncome: state.monthlyIncome - state.monthlySpend
		}
		

		if (this.state.editMode) {
			return (
				<div className="user-stats-wrapper">
				    <Greetings username={state.username} />
				    <div className="row">
		                <FinancialStat 
		                description={'Income '} value={state.monthlyIncome} 
		                editing={true} onChange={this.handleStatEdit}
		                name={'monthlyIncome'}
		                />
                        <FinancialStat description={'Expenses '} value={state.monthlySpend}/>
                        <FinancialStat description={'Net Income '} value={dynamicStats.netIncome}/>
                        <FinancialStat description={'Goal For Month'} value={state.monthlyGoal}
                   	    editing={true} onChange={this.handleStatEdit}
                   	    name={'monthlyGoal'}
                        />
                        <SaveUserStats  onClick={this.saveStats}/>
			        </div>	
			    </div>
			);
		}

		return (
			<div className="user-stats-wrapper">
				<Greetings username={state.username} />
			    <div className="row">
		            <FinancialStat description={'Income '} value={state.monthlyIncome}/>
                    <FinancialStat description={'Expenses '} value={state.monthlySpend}/>
                    <FinancialStat description={'Net Income '} value={dynamicStats.netIncome}/>
                    <FinancialStat description={'Goal For Month'} value={state.monthlyGoal}/>
                    <EditUserStats  onClick={this.editStats}/>
			    </div>		
			</div>
		);
	}
}  