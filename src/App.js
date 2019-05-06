import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Homepage from "./containers/Homepage.js"
import ManageTiming from './containers/ManageTiming'
import ManageStation from './containers/ManageStation'
import ManagePump from './containers/ManagePump'
import MyBookings from "./containers/MyBookings.js"
import FindStation from "./containers/FindStation.js"

import Home from "./containers/Home.js"
import './App.css';


class App extends Component {

  render() 
  {
    return (
      <>
        <Route exact path ={'/'} component={Homepage}/>
        <Route path ={'/Dashboard/Home'} component={Home}/>
        <Route path ={'/Dashboard/Map'} component={FindStation}/>
        <Route path ={'/Dashboard/MyBookings'} component={MyBookings}/>
        <Route path ={'/Dashboard/Admin/ManageTiming'} component={ManageTiming}/>
        <Route path ={'/Dashboard/Admin/ManagePump'} component={ManagePump}/>
        <Route path ={'/Dashboard/Admin/ManageStation'} component={ManageStation}/>

      </>
    )
  }
}

export default App;
