import React from 'react';
import './styles/Greetings.css';

export default function Greetings (props) {
	return (
		<div className="greetings-wrapper row">
			<div className="col-md-12 greetings-container">	
				<div className="greet-user">
				    <span className="greeting">Hello {props.username}</span>
				</div>
				<div className="greet-descr">
					<span className="greeting-descr">Stats For The Month Thus Far</span>
				</div>
			</div>
		</div>
	);
}