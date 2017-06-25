import React from 'react';
import './styles/EditUserStats.css';

export default function EditUserStats (props) {
	return (
		<div className="col-md-3">
			<div className="edit-stats-link-container">
				<button className="edit-stats" onClick={props.editOnClick}>
				    Edit
				</button>
			</div>
		</div>
	);
}