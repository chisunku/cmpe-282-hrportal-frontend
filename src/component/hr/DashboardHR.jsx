import React, { Component } from "react";
import "./DashboardHR.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
// import Position from "../Position.jsx";
import Department from "../Department.jsx";
// import Country from "../Country.jsx";
// import State from "../State.jsx";
// import City from "../City.jsx";
// import Company from "../Company.jsx";
import Employee from "../Employee.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "./LeaveApplicationHR.jsx";
import Bot from "../chatBot.jsx";
import Analytics from "../hr/analytics.jsx";
import NotFound404 from "../NotFound404.jsx";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChair,
  faBuilding,
 faUser,
faUserTie,
faRupeeSign,
faFileAlt,
faCity,
faGlobeAmericas,
faPlaceOfWorship,
faArchway,
faDollarSign,
faBriefcase,
faSitemap,
faRobot,
faChartBar,
} from "@fortawesome/free-solid-svg-icons";

function RoleHRF() {
  return <Role />;
}

function DepartmentF() {
  return <Department />;
}
function EmployeeF() {
  return <Employee />;
}
function SalaryF() {
  return <Salary />;
}
function LeaveApplicationHRF() {
  return <LeaveApplicationHR />;
}
function BotHRF(){
    return <Bot />;
}
// function AnalyticsHRF(){
//     return <Analytics />;
// }

// function HRPortalF() {
//   return <HRPortal />;
// }
// function HRProjectBidF() {
//   return <HRProjectBid />;
// }

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true 
  };
  handleChange=(checked)=> {
    console.log("switch");
    // var sidebarV = this.refs.sidebar;
    // var sidebarV = React.findDOMNode( this.refs.sidebar);
    // sidebarV.style.disply="none";
    
    if(this.state.checked==true){ 
       // document.getElementById("sidebar").setAttribute("style", "display:none")
      document.getElementById("sidebar").setAttribute("class", "display-none");
    }
    // document.getElementById("sidebar").setAttribute("style", "display:block");
    else{document.getElementById("sidebar").setAttribute("class", "display-block");}   
    this.setState({ checked });
  }

  render() {
    return (
      <Router>
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            {/* <NavBar loginInfo={this.props.data} /> */}
            <NavBar loginInfo={this.props.data} checked={this.state.checked} handleChange={this.handleChange} onLogout={this.props.onLogout}/>

          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                HR
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/hr/employee">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
                    Employees
                  </Link> 
                </li>
                <li>
                  <Link to="/hr/salary">
                    <FontAwesomeIcon icon={faDollarSign} className="sidebar-icon" /> 
                    Salary 
                  </Link> 
                </li>
                <li>
                  <Link to="/hr/leave-application-hr">
                    <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" /> 
                    Leave Application 
                  </Link> 
                </li>

                <li>
                  <Link to="/hr/role">
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" /> 
                    Role 
                  </Link> 
                </li>

                <li>
                  <Link to="/hr/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    /> 
                    Department 
                  </Link> 
                </li>
                <li>
                    <Link to="/hr/bot">
                        <FontAwesomeIcon icon={faRobot} className="sidebar-icon" />
                        BOT
                    </Link>
                </li>
{/*                 <li> */}
{/*                     <Link to="/hr/analytics"> */}
{/*                     <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" /> */}
{/*                         Analytics */}
{/*                     </Link> */}
{/*                 </li> */}
              </ul>
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* //table */}
              {/* <RoleHR/> */}
              <Switch>
                <Route
                  path="/hr/employee"
                  // exact
                  component={EmployeeF}
                />
                <Route
                  path="/hr/salary"
                  exact
                  component={SalaryF}
                />
                <Route path="/hr/role" component={RoleHRF} />

                <Route
                  path="/hr/department"
                  exact
                  component={DepartmentF}
                />
                <Route
                  path="/hr/leave-application-hr"
                  exact
                  component={LeaveApplicationHRF}
                />
                <Route
                    path="/hr/bot"
                    exact
                    component={BotHRF}
                />
                <Route render={() => <NotFound404/>} />
                
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;


{/*                 <Route */}
{/*                     path="/hr/analytics" */}
{/*                     exact */}
{/*                     component={AnalyticsHRF} */}
{/*                 /> */}