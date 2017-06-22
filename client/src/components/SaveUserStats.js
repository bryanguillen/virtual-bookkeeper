import React from 'react';
import './styles/SaveUserStats.css'

export default function SaveUserStats (props) {
	return (
		<div className="col-md-3">
			<div className="save-stats-container">
				<button className="save-stats" onClick={props.onClick}>
				    Save
				</button>
			</div>
		</div>
	);
}