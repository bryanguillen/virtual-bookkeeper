import React from 'react'; 

export default function ErrorMessage (props) {
	return (
		<div className="row">
			<div className="col-md-12">
				<span>{props.message}</span>
			</div>
		</div>
	);
}