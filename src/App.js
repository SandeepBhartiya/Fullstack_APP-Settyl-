import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import React from "react";

import SideBar from './components/sidebar/sidebar';
import EmployeeList from "./components/Employee/Emp";
import About from "./components/AboutUs/aboutus";
function App() {
return (
    <Router>
      <SideBar/>
      <div style={{marginLeft:"250px"}}>

      <Switch>
        <Route exact path="/" />
        <Route path="/employees" component={EmployeeList}/>
        <Route path="/about-us" component={About}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
