import React from 'react';

export default function FinancialStat (props) {
	return (
        <div className="stat-wrapper">
        	<span className="stat-descr">
        		{props.description}
        	</span>
        	<span className="stat-value">
        		{props.value}
        	</span>
        </div>
	);
}