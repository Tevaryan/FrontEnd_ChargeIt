import React, { Component } from 'react';
import PopUp from "./component.js";
import Geocoding from "./geocoding.js";
import CustomLocation from "../components/CustomLocation.js";
import FilterStations from "../components/FilterStations.js";
import NavbarComponent from "../components/NavbarComponent.js"
import {Redirect} from "react-router-dom";
import axios from 'axios';
import ReactMapboxGl, { Layer, Feature} from "react-mapbox-gl";
import {
    Button, Modal
  } 
  from 'reactstrap';
import '../App.css';



const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidGV2YW5pdW0iLCJhIjoiY2p1aW5maWNuMWNudDQzcHBva3d0dWN1YyJ9.WUbs5F9YLjZGQSaXEmiW9w"
  });
  

class FindStation extends Component {
        state ={
          locateUser: 'Seri Kembangan Malaysia',
          userLocationLng: '',
          userLocationLat: '',
          locations: [],
          clickedLocation: [],
          customLocationModal: false,
          filterModal: false,
          toggleNavbarComponent: false
        }

        clickCustomLocation =()=>{
            this.setState({
                customLocationModal: !this.state.customLocationModal
            })
        }

        clickFilterStation =()=>{
            this.setState({
                filterModal: !this.state.filterModal
            })
        }
      
        componentDidMount() {
          // performing a GET request to '/api-end-point'
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locateUser}&key=AIzaSyCz2XfFOJs5LX94xX69vyj0TqZOmsw6p1c`)
            .then(result => {
              // If successful, we do stuffs with 'result'
              this.setState({
                userLocationLng: result.data.results[0].geometry.location.lng,
                userLocationLat: result.data.results[0].geometry.location.lat,
              })
            })
            .catch(error => {
              // If unsuccessful, we notify users what went wrong
              console.log('ERROR: ', error)
            })    
        }
      
        getLocation = (lng, lat) => {
          let newLocation = [lng,lat]
          this.setState(
            {
              locations: [...this.state.locations, newLocation]
            }
          )
        }
      
        clicked = (location) =>{
          this.setState({
            clickedLocation: [...this.state.clickedLocation, location]
          })
        
        }
        
        clickedAgain = (location) =>{
      
          let newClickedLocation = this.state.clickedLocation.filter((locations) => {
            // returns all the entires that are not equals to location, hence deleting the particular location instance from that list
            if (locations != location ){
              return this.state.clickedLocation
            }
          })
      
          this.setState({
            clickedLocation: newClickedLocation
          })
          
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
            <div style={{backgroundColor: '#aeb6be', height:'100vh'}}>
              <NavbarComponent/>
                <Map
                    style="mapbox://styles/mapbox/dark-v9"
                    containerStyle={{
                        height: "85vh",
                        width: "100vw"
                    }}
                    center={[this.state.userLocationLng,this.state.userLocationLat]}>
                        <Layer
                        type="symbol"
                        id="ItemLocation"
                        layout={{ "icon-image": "marker-15" }}>
                        {
                            this.state.locations.map(location =>
                            <Feature coordinates={location} onClick = {() => {this.clicked(location)}}/>
                            )
                        }
                        </Layer>
                        <Layer type="symbol"
                        id="userLocation"
                        layout={{"icon-image": "harbor-15"}}>
                        
                        <Feature coordinates = {[this.state.userLocationLng, this.state.userLocationLat]}/>

                        </Layer>
                        {
                        this.state.clickedLocation.map(location => 
                            <PopUp location={location} clickedAgain = {this.clickedAgain} start={this.state.locateUser}/> 
                        )             
                        }
                </Map>
                <Geocoding getLocation={this.getLocation} locateUser = {this.state.locateUser}/>
                <div className="text-center"> 
                    <Button className="mt-2 mr-2" style={{backgroundColor: '#5D6D7E'}}
                        onClick={this.clickCustomLocation} >Custom Location</Button>
                    <Button className="mt-2 mr-2" style={{backgroundColor: '#5D6D7E'}}
                        onClick={this.clickFilterStation}>Filter</Button>
                    <Button className="mt-2 mr-2" style={{backgroundColor: '#5D6D7E'}}>Center</Button>
                    <Button className="mt-2 mr-2" style={{backgroundColor: '#5D6D7E'}}>Show All</Button>
                    <Modal isOpen={this.state.customLocationModal}>
                        <CustomLocation closeModal={this.clickCustomLocation}/>
                    </Modal>
                    <Modal isOpen={this.state.filterModal}>
                        <FilterStations closeModal={this.clickFilterStation}/>
                    </Modal>
                </div>
            </div>
    )
  }
}

export default FindStation;
