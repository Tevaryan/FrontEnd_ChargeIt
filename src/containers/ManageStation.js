import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import NavbarComponentAdmin from '../components/NavbarComponentAdmin.js'
import EditStation from '../components/EditStation.js'
import {Redirect} from "react-router-dom";
import axios from 'axios'
import '../App.css';


class ManageStation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            Station: '',
            contact: '',
            location: '',
            Station_object: []
        };
      }
    
    SubmitStation = (event) => {
        this.setState({
            Station: event.target.value
        })
        console.log(this.state.Station)
    }

    SubmitContact = (event) => {
        this.setState({
            contact: event.target.value
        })
    }

    SubmitLocation = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    storeStation = () => {
        axios( {
            url: `http://localhost:5000/station/${this.state.Station}`,
            method: "post",
          })
          .then((response)=> {
              console.log(response)
          })
          .catch( (error)=> {
            console.log(error);
          });
    }

    storeContact = () => {
        axios( {
            url: `http://localhost:5000/station/create/${this.state.contact}/${this.state.Station}/${this.state.location}`,
            method: "post",
          })
          .then((response)=> {
              console.log(response)
          })
          .catch( (error)=> {
            console.log(error);
          });
    }

    showStation =()=>{
        this.state.Station_object.map(station =>{
            console.log(station.name)
        })
    }

  render() 
  {
      if (localStorage.username != 'admin'){
        return <Redirect to='/'/>
      }
    return (
        <>
            <NavbarComponentAdmin/>
            <Form className="ml-2 mt-2" >

                <FormGroup >
                    <Label>Station</Label>
                    <Input style={{width:"80%"}} type="text" onChange={this.SubmitStation} placeholder="enter Station Name" />
                    <Label>Contact</Label>
                    <Input style={{width:"80%"}} type="text" onChange={this.SubmitContact} placeholder="enter Contact Number" />
                    <Label>Location</Label>
                    <Input style={{width:"80%"}} type="text" onChange={this.SubmitLocation} placeholder="enter Location" />
                </FormGroup>
                <Button onClick={this.storeContact} type="submit">Create New Station</Button>
            </Form>
        </>
    )
  }
}

export default ManageStation;