import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
export interface StepsProps extends RouteComponentProps<{ pID: string }> { }

const ShopCar: React.FC<StepsProps> = props => {

    return (
        <div>
            <h1>Learn Car Shop {props.match.params.pID}</h1>
        </div>
    );
};
export default withRouter(ShopCar)
