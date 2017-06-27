import React from 'react';
import './styles/SaveUserStats.css'

export default function EditStatButton (props) {
	if (props.editing) {
		return (
			<div className="col-md-3">
			<div className="save-stats-container">
				<button className="edit-stats" onClick={props.onClick}>
				    Save
				</button>
			</div>
			</div>
		);
	}

	return (
		<div className="col-md-3">
			<div className="save-stats-container">
				<button data={props.field} className="save-stats" onClick={props.onClick}>
				    Edit
				</button>
			</div>
		</div>
	);
}