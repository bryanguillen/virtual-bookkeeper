import React from 'react';
import './styles/MonthAndYear.css'; 

export default function MonthAndYear (props) {
	return (
		<div className="col-md-4">
			<span  data-month={props.dataMonth} data-year={props.dataYear} className="month-and-year" onClick={props.onClick}>
				{props.month} - {props.year}
			</span>
		</div> 
	);
}