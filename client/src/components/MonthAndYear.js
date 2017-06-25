import React from 'react';
import './styles/MonthAndYear.css'; 

export default function MonthAndYear (props) {
	return (
		<div className="col-md-4">
			<span className="month-and-year">
				{props.month} - {props.year}
			</span>
		</div> 
	);
}