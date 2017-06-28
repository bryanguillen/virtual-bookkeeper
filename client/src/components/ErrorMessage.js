import React from 'react'; 

export default function ErrorMessage (props) {
	if (props.error) {
		return (
			<div className="row">
				<div className="col-md-12">
					<span>{props.message}</span>
				</div>
			</div>
		);
	}

	return (
		<div></div>
	);
}