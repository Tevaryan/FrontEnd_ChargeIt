import React, { Component } from 'react';
import {Button, Row} from 'reactstrap'
import Timing from './timing.js'
import axios from 'axios'
import '../App.css';


class StationPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          ports: []
        };
      }
    
    componentDidMount() {
          axios( {
            url: `https://chargeit.herokuapp.com/pumps/show`,
            method: "get",
          })
          .then((response)=> {
            console.log(response)
            this.setState({
                ports: response.data.pump_object
            })   
          })
          .catch( (error)=> {
            console.log(error);
          });
        }

  render() 
  {
    return (
        <div className='mt-3 mr-3 ml-3'>
            <div style={{backgroundColor:"#d6dade", borderRadius:'5px'}}>
                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>{this.props.closeStation(this.props.stationName)}} className="mr-4 mt-4 sm">X</Button>
                </div>
                <h2 className="ml-4">{this.props.stationName}</h2>
                <hr className="mr-4 ml-4"/>
                <Row className='ml-5'>
                    {
                        this.state.ports.map(port =>
                            port.station_id == this.props.stationid ?
                            <Timing port = {port.pump_name} port_id={port.id} stationid={this.props.stationid} className="mr-5"/>:
                            null
                        )
                    }
                </Row>
                
            </div>
        </div>
    )
  }
}

export default StationPage;
