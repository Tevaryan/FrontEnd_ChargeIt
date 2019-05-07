import React, { Component } from 'react';
import NavbarComponentAdmin from '../components/NavbarComponentAdmin.js'
import { Button, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios'
import {Redirect} from "react-router-dom";
import '../App.css';
import FilterStations from '../components/FilterStations.js';


class ManagePump extends Component {
  constructor(props) {
    super(props);

    this.state = {
        StationName: '',
        StationId: '',
        Stations: [],
        showStation: false,
        dropdownOpen: false,
        pump: ''
    };
  }

  showStationClick = (id,name) => {
    this.setState({
      StationId: id,
      showStation: !this.state.showStation,
      StationName: name
    })
  
  }

  toggle = () =>{
    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    })

  }

  Submitpump =(event) => {
    this.setState({
      pump: event.target.value
    })
    console.log(this.state.pump)
  }

  show = () => {
    console.log(this.state.StationId)
    console.log(this.state.StationName)
  }

  componentDidMount() {
    axios( {
        url: `https://chargeit.herokuapp.com/station/show`,
        method: "get",
      })
      .then((response)=> {
        this.setState({
          Stations: response.data.station_object
        })
          
      })
      .catch( (error)=> {
        console.log(error);
      });
    }
  
  storePump = () =>{
    axios( {
      url: `https://chargeit.herokuapp.com/pumps/${this.state.pump}/${this.state.StationId}`,
      method: "post",
    })
    .then((response)=> {
      console.log(response)
      this.setState({
        StationName: '',
        StationId: ''
      })
    })
    .catch( (error)=> {
      console.log(error);
    });
  }

  render() 
  {
    if (localStorage.username != 'admin'){
      return <Redirect to='/'/>
    }
    return (
        <>
        <NavbarComponentAdmin/>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
            <DropdownToggle caret style={{backgroundColor: '#5D6D7E'}} className="mt-3 ml-3">
                {
                   this.state.StationName ?
                   this.state.StationName:
                   'Choose Station'
                }
            </DropdownToggle>
            <DropdownMenu>
                {
                    this.state.Stations.map(location =>
                        <div>
                            <DropdownItem onClick={()=>{this.showStationClick(location.id, location.name)}} >{location.name}</DropdownItem> 
                            <DropdownItem divider/> 
                        </div>
                        )
                }
            </DropdownMenu>
        </Dropdown>
        <FormGroup className="mt-3 ml-3">
            <Label>Station</Label>
            <Input style={{width:"80%"}} type="text" onChange={this.Submitpump} placeholder="enter Pump Name" />
        </FormGroup>
        <Button onClick={this.storePump} type="submit" className="mt-2 ml-3">Create Pump</Button>
        </>
      )
    }
  }

export default ManagePump;