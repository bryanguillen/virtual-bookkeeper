import React from 'react';
import './styles/EditStatButton.css'

export default function EditStatButton (props) {
	if (props.editing) {
		return (
			<div className="col-md-2 edit-stats-outer">
			<div className="save-stats-container">
				<button className="edit-stats" onClick={props.saveOnClick}>
				    Save
				</button>
			</div>
			</div>
		);
	}

	return (
		<div className="col-md-12 edit-stats-outer">
			<div className="edit-stats-container">
				<button className="save-stats" onClick={props.editOnClick}>
				    Edit
				</button>
			</div>
		</div>
	);
}