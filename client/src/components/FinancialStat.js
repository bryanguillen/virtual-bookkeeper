import React from 'react';
import './styles/FinancialStat.css';
import EditStatField from './EditStatField';

export default function FinancialStat (props) {
        if (props.editing) {
            return (
                <div className="col-md-3">
                    <div className="stats-container">
                        <span className="stat-descr">
                            {props.description}
                        </span>
                    </div>
                    <div className="stats-container">
                        <EditStatField 
                        onChange={props.onChange}
                        value={props.value}
                        name={props.name}
                        />
                    </div>
                </div>
            );        
        }
           
        if (props.edible) {
            return(
              <div className="col-md-3">
                    <div className="stats-container">
                        <span className="stat-descr">
                            {props.description}
                        </span>
                    </div>
                    <div className="stats-container">
                        <span className="stat-value edible">
                            {props.value}
                        </span>
                    </div>
                </div>
            );
        }

        return(
            <div className="col-md-3">
                <div className="stats-container">
                    <span className="stat-descr">
                        {props.description}
                   </span>
                </div>
                <div className="stats-container">
                    <span className="stat-value">
                        {props.value}
                    </span>
                </div>
            </div>
        );
}