import React from 'react';
import FinancialStat from './FinancialStat';

export default function UserStats (props) {
	return (
		<div className="row">
		    <FinancialStat description={'Income '} value={2000}/>
            <FinancialStat description={'Expenses '} value={500}/>
            <FinancialStat description={'Net Income '} value={1500}/>
            <FinancialStat description={'Goal For '} value={750}/>
		</div>
	);
}