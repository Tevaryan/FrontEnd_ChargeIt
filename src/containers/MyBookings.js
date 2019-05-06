import React, { Component } from 'react';
import NavbarComponent from '../components/NavbarComponent.js'
import {Redirect} from "react-router-dom";
import {Button} from 'reactstrap'
import axios from 'axios'
import '../App.css';


class MyBookings extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Booking_Object: []
    }
  }

  componentDidMount() {
    axios( {
      url: `http://localhost:5000/booking/showbookedtiming/${localStorage.user_id}`,
      method: "get",
    })
    .then((response)=> {
      console.log(response)
      this.setState({
          Booking_Object: response.data.booking_object
      })
    })
    .catch( (error)=> {
      console.log(error);
    });
  }

  CancelBooking = (userid, timings, pumpid, stationid) => {
    axios( {
      url: `http://localhost:5000/booking/cancelTiming/${userid}/${timings}/${pumpid}/${stationid}`,
      method: "post",
    })
    .then((response)=> {
      console.log(response)
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
        <div style={{backgroundColor: '#aeb6be', height:'100vh'}}>
            <NavbarComponent/>
            <div>
                    {
                        this.state.Booking_Object.map(object =>
                            <>
                                <hr/>
                                    <div class="d-flex flex-row mt-2">
                                        <h5 className="ml-2 mr-5 mt-2">{object.station_name}</h5>
                                        <h5 className="mr-5 mt-2">{object.pump_name}</h5>
                                        <h5 className="mr-5 mt-2">{object.timing}</h5>
                                        <h5 className="mr-5 mt-2">
                                            {
                                                //need to add username here, backreff doesnt work
                                                localStorage.username
                                            }
                                        </h5>
                                        {/* <Button style={{backgroundColor:'maroon'}} className="ml-2" onClick={()=>{this.CancelBooking(object.user_id, object.timing, object.pump_id, object.station_id )}} type="submit">Cancel Booking</Button> */}
                                    </div>
                                <hr/>
                            </>
                        )
                    }
            </div>
            
        </div>
    )
  }
}

export default MyBookings;
