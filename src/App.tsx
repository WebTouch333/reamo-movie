import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import LearnCar from './LearnCar/learCar';
import shopCar from './Shop/shopCar';
import { Logo, Block } from 'vcc-ui';
import Card from './CarContainer/carContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Block extend={{
        display: 'flex',
        flexDirection: 'column',
        padding: "20px 0",
        backgroundColor: '#f5f5f5'

      }}>
        <Logo type="spreadmark" height={26} alt="logo" />
      </Block>

      <div style={{ padding: "0 30px" }}>

        <HashRouter>
          <Switch>
            <Route exact path="/" component={Card} />
            <Route exact  path="/learn/:pID" component={LearnCar} />
            <Route exact path="/shop/:pID" component={shopCar} />
          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}
export default App;
