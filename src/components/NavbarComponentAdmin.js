import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu, Modal,
    DropdownItem } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import '../App.css';


class NavbarComponentAdmin extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          logout: false
        };
      }

      toggle =()=> {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      logoutHandler = () =>{
        localStorage.removeItem("JWT")
        localStorage.removeItem('profile_picute')
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        localStorage.removeItem("location")
        localStorage.removeItem("destination")
        this.setState({logout: true})
      }



  render() 
  {
    if (this.state.logout === true){
      return <Redirect to='/'/>
    } 
    return (
        <Navbar style={{backgroundColor: '#5D6D7E'}} light expand="md">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to={'/Dashboard/Admin/ManageStation'}>Manage Stations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={'/Dashboard/Admin/ManagePump'}>Manage Pumps</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={'/Dashboard/Admin/ManageTiming'}>Manage Timings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.logoutHandler} >Sign Out</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
    )
  }
}

export default NavbarComponentAdmin;
