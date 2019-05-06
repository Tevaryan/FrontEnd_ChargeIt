import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Button, Alert } from 'reactstrap';
import axios from 'axios'
import '../App.css';


class Timing extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          dropdownOpen: false,
          not_available: 'not available',
          settiming: '',
          booking: [],
          alertOpen: false
        };
      }

    toggle =()=> {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
      }
    
    toggleAlert = () => {
      this.setState({
        alertOpen: !this.state.alertOpen
      })
    }
    
      componentDidMount() {
        axios( {
            url: `http://localhost:5000/booking/show`,
            method: "get",
          })
          .then((response)=> {
            this.setState({
              booking: response.data.booking_object
            })
          })
          .catch( (error)=> {
            console.log(error);
          });
        }
      
      setTime = (booking_timing) =>{
        this.setState({
          settiming: booking_timing
        })
      }

      deselectTime = () => {
        this.setState({
          settiming: ''
        })
      }

      handleSubmit = () => {
        axios( {
          url: `http://localhost:5000/booking/bookTiming/${localStorage.user_id}/${this.state.settiming}/${this.props.port_id}/${this.props.stationid}`,
          method: "post",
        })
        .then((response)=> {
          this.setState({
            alertOpen: !this.state.alertOpen
          })
        })
        .catch( (error)=> {
          console.log(error);
        });

      }

    render() 
    {
        return (
        <div>
            <Row className='d-flex align-items-baseline mr-5 mb-5'>

                    <h5 >{this.props.port}</h5>
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="mr-1 ml-1 sm">
                        <DropdownToggle caret>
                        {
                          this.state.settiming?
                          this.state.settiming:
                          'Available Timing'
                        }
                        </DropdownToggle>
                        <DropdownMenu>
                              <DropdownItem onClick={this.deselectTime}>Available Timing</DropdownItem>
                              <hr></hr>
                              {
                                this.state.booking.map(booking =>
                                  (booking.pump_id == this.props.port_id && booking.station_id == this.props.stationid) && !booking.user_id ?
                                  <DropdownItem onClick={()=> {this.setTime(booking.timing)}}>
                                  {booking.timing}
                                  </DropdownItem>:
                                  null
                                )
                              }
                        </DropdownMenu>
                    </ButtonDropdown>
                    <Button color="primary" className="mr-1" onClick={this.handleSubmit}>Book</Button>

            </Row>
            <Alert isOpen={this.state.alertOpen} toggle={this.toggleAlert}>
              <h1>Successfully Booked!</h1>
            </Alert>
        </div>
            
        )
    }
}

export default Timing;
