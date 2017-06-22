import React from 'react';
import FinancialStat from './FinancialStat';
import axios from 'axios';
import EditUserStats from './EditUserStats';
import SaveUserStats from './SaveUserStats';

//you are going to need to make this into a stateful comp
//for getting data from the server... 

export default class UserStats extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
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
			})
			.catch(err => {
				console.log(err);
			})
		this.setState( prevState => ({
			editMode: !prevState.editMode
		}))
	}

	render () {
		
		if (this.state.editMode) {
			return (
				<div className="row">
		            <FinancialStat 
		            description={'Income '} value={this.state.monthlyIncome} 
		            editing={true} onChange={this.handleStatEdit}
		            name={'monthlyIncome'}
		            />
                    <FinancialStat description={'Expenses '} value={this.state.monthlySpend}/>
                    <FinancialStat description={'Net Income '} value={this.state.netIncome}/>
                    <FinancialStat description={'Goal For Month'} value={this.state.monthlyGoal}
                   	 editing={true} onChange={this.handleStatEdit}
                   	 name={'monthlyGoal'}
                     />
                    <SaveUserStats  onClick={this.saveStats}/>
			    </div>	
			);
		}

		return (
			<div className="row">
		        <FinancialStat description={'Income '} value={this.state.monthlyIncome} editing={false}/>
                <FinancialStat description={'Expenses '} value={this.state.monthlySpend} editing={false}/>
                <FinancialStat description={'Net Income '} value={this.state.monthlyIncome - this.state.monthlySpend} editing={false}/>
                <FinancialStat description={'Goal For Month'} value={this.state.monthlyGoal} editing={false}/>
                <EditUserStats  onClick={this.editStats}/>
			</div>		
		);
	}
}  