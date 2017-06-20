import React from 'react';
import './styles/Greetings.css';

export default function Greetings (props) {
	return (
		<div className="greetings-wrapper">
			<span>Hello {props.username}</span>
		</div>
	);
}