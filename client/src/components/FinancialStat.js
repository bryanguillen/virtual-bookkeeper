import React from 'react';
import './styles/FinancialStat.css';

export default function FinancialStat (props) {
	return (
            <div className="col-md-3">
                <div className="stats-container">
                    <span className="stat-descr">
        		        {props.description}
        	       </span>
                </div>
                <div className="stats-container">
        	        <span className="stat-value">
        		        {props.value}
        	        </span>
                </div>
            </div>
	);
}