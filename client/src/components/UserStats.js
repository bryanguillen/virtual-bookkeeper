import React from 'react';
import FinancialStat from './FinancialStat';
import Greetings from './Greetings';
import EditUserStats from './EditUserStats';
import SaveUserStats from './SaveUserStats';

export default class UserStats extends React.Component {
	constructor (props) {
		super(props);
		this.handleStatEdit = this.handleStatEdit.bind(this);		
	}

	handleStatEdit (e) {
		this.props.onChange(e);
	}

	render () {
		let props = this.props;

		if (props.editMode) {
			return (
				<div className="user-stats-wrapper">
				    <Greetings username={props.username} />
				    <div className="row">
		                <FinancialStat 
		                description={'Income '} value={props.monthlyIncome} 
		                editing={true} onChange={this.handleStatEdit}
		                name={'monthlyIncome'}
		                />
                        <FinancialStat description={'Expenses '} value={props.monthlySpend}/>
                        <FinancialStat description={'Net Income '} value={props.netIncome}/>
                        <FinancialStat description={'Savings Goal'} value={props.monthlyGoal}
                   	    editing={true} onChange={this.handleStatEdit}
                   	    name={'monthlyGoal'}
                        />
                        <SaveUserStats  saveOnClick={props.saveOnClick}/>
			        </div>	
			    </div>
			);
		}

		return (
			<div className="user-stats-wrapper">
				<Greetings username={props.username} />
			    <div className="row">
		            <FinancialStat description={'Income '} value={props.monthlyIncome}/>
                    <FinancialStat description={'Expenses '} value={props.monthlySpend}/>
                    <FinancialStat description={'Net Income '} value={props.netIncome}/>
                    <FinancialStat description={'Savings Goal'} value={props.monthlyGoal}/>
                    <EditUserStats  editOnClick={props.editOnClick}/>
			    </div>		
			</div>
		);
	}
}  