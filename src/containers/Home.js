import React, { Component } from 'react';
import NavbarComponent from "../components/NavbarComponent.js"
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap'
import StationPage from "./StationPage.js"
import {Redirect} from "react-router-dom";
import axios from 'axios'
import '../App.css';


class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          dropdownOpen: false,
          showStation: false,
          stationNames: [],
          stationName: []
        };
      }
    
    toggle = () =>{
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })

    }
    
    showStationClick = (location) => {
        this.setState({
            showStation: true,
            stationName: [...this.state.stationName, location]
            
        })
    }

    closeStationClick = () => {
        this.setState({
            showStation: false
        })
    }

    closeStationView = (locations) => {
        let closeLocation = this.state.stationName.filter((location) =>
        {
            if (location.name != locations){
                return this.state.stationName
            }
        }
        )

        this.setState({
            stationName: closeLocation
        })
    }

    componentDidMount() {
        axios( {
            url: `http://localhost:5000/booking/show`,
            method: "get",
          })
          .then((response)=> {
            console.log(response)
          })
          .catch( (error)=> {
            console.log(error);
          });

          axios( {
            url: `http://localhost:5000/station/show`,
            method: "get",
          })
          .then((response)=> {
            this.setState({
              stationNames: response.data.station_object
            })
              
          })
          .catch( (error)=> {
            console.log(error);
          });
    }
    

  render() 
  {
    if (!localStorage.JWT){
      return <Redirect to='/'/>
    } 
    else if (localStorage.username === 'admin'){
      return <Redirect to='/Dashboard/Admin/ManageStation'/>
    }
    return (
        <div style={{backgroundColor: '#aeb6be', height:'100vh', overflow:'auto'}}>
            <NavbarComponent/>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
            <DropdownToggle caret style={{backgroundColor: '#5D6D7E'}} className="mt-3 ml-3">
                Choose Station
            </DropdownToggle>
            <DropdownMenu>
                {
                    this.state.stationNames.map(location =>
                        <div>
                            <DropdownItem onClick={()=>{this.showStationClick(location)}}>{location.name}</DropdownItem> 
                            <DropdownItem divider/> 
                        </div>
                        )
                }
            </DropdownMenu>
            </Dropdown>
            {
                this.state.showStation ?
                    this.state.stationName.map(location =>
                        <StationPage close={this.closeStationClick} stationName={location.name} stationid={location.id} closeStation={this.closeStationView}/>
                        ):
                null
            }
        </div>
    )
  }
}

export default Home;