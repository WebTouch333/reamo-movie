import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface StepsProps extends RouteComponentProps<{ pID: string }> { }

const LearnCar: React.FC<StepsProps> = props => {
    // parse int becasue react router vars can only be strings
    return (
        <div>
            <h1>Learn Car Modal { props.match.params.pID}</h1>
        </div>
    );
};
export default withRouter(LearnCar)
