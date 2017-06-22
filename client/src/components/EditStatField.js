import React from 'react';
import './styles/EditStatField.css';

export default function EditStatField (props) {
	return (
		<div className="edit-stat-field-wrapper">
			<input 
			type="number" 
			className="edit-stat-field" 
			value={props.value}
			onChange={props.onChange}
			name={props.name}
			/>
		</div>
	);
}