import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal } from 'reactstrap';
import '../App.css';
import {Redirect} from "react-router-dom";
import axios from 'axios'
import NavbarComponentAdmin from '../components/NavbarComponentAdmin';


class ManageTiming extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            Booking_Object: [],
            Pump_object: [],
            Stations: [],
            timings: ['00.00 am', '00.30 am', '01.00 am', '01.30 am', '02.00 am', '02.30 am', '03.00 am', '03.30 am', '04.00 am', '04.30 am', '05.00 am', 
                        '05.30 am', '06.00 am', '06.30 am', '07.00 am', '07.30 am',
                        '08.00 am', '08.30 am', '09.00 am', '09.30 am', '10.00 am', '10.30 am', '11.00 am', '11.30 am', '12.00 pm', '12.30 pm', '13.00 pm', '13.30 pm', '14.00 pm', '14.30 pm', 
                        '15.00 pm', '15.30 pm', '16.00 pm', '16.30 pm', '17.00 pm', '17.30 pm', '18.00 pm', '18.30 pm' , '19.00 pm', '19.30 pm', '20.00 pm', '20.30 pm', '21.30 pm', 
                        '22.00 pm', '22.30 pm', '23.00 pm', '23.30 pm'],
            pump: [],
            ChosenStation: '',
            ChosenStationId: '',
            ChosenTiming: '',
            EditChosenTiming: '',
            ChosenPump: '',
            ChosenPumpId: '',
            dropdownOpenStation: false,
            dropdownOpenPump: false,
            dropdownOpentiming: false,
            Edittiming: false,
            modalisOpen: false,
            modalStationName: '',
            modalBookingid: '',
            modalPumpName: ''
        };
      }
    
    toggleStation = () => {
        this.setState({
            dropdownOpenStation: !this.state.dropdownOpenStation
        })
    }

    togglePump = () => {
        this.setState({
            dropdownOpenPump: !this.state.dropdownOpenPump
        })
    }

    toggletiming = () => {
        this.setState({
            dropdownOpentiming: !this.state.dropdownOpentiming
        })
    }

    toggleEditiming = () => {
        this.setState({
            Edittiming: !this.state.Edittiming
        })
    }

    setChosenStation = (station, id) => {
        this.setState({
            ChosenStation: station,
            ChosenStationId: id
        })
    }

    setChosenPump = (pump, id) => {
        this.setState({
            ChosenPump: pump,
            ChosenPumpId: id
        })
    }

    setChosenTiming = (timing) => {
        this.setState({
            ChosenTiming: timing
        })
    }

    EditChosenTiming = (timing) => {
        this.setState({
            EditChosenTiming: timing
        })
    }

    show = () =>
        {
            console.log(this.state.Stations)
            console.log(this.state.Pump_object)
        }
    
    ActivateModal = (id, station_name, pump_name) =>{
        this.setState({
            modalStationName: station_name,
            modalBookingid: id,
            modalPumpName: pump_name,
            modalisOpen: !this.state.modalisOpen
        })
    }

    closemodal = () => {
        this.setState({
            modalisOpen: !this.state.modalisOpen
        })
    }

    componentDidMount() {
        axios( {
            url: `https://chargeit.herokuapp.com/pumps/show`,
            method: "get",
          })
          .then((response)=> {
            this.setState({
                Pump_object: response.data.pump_object
            })
              
          })
          .catch( (error)=> {
            console.log(error);
          });
        
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
        
        axios( {
            url: `https://chargeit.herokuapp.com/booking/show`,
            method: "get",
          })
          .then((response)=> {
            this.setState({
                Booking_Object: response.data.booking_object
            })
          })
          .catch( (error)=> {
            console.log(error);
          });

        }
    
    storeTiming = () => {
        axios( {
            url: `https://chargeit.herokuapp.com/booking/${this.state.ChosenStationId}/${this.state.ChosenPumpId}/${this.state.ChosenTiming}`,
            method: "post",
          })
          .then((response)=> {
            this.setState({
                ChosenStation: '',
                ChosenStationId: '',
                ChosenTiming: '',
                ChosenPump: '',
                ChosenPumpId: '',
            })        
          })
          .catch( (error)=> {
            console.log(error);
          });
        }
    
    deleteTiming = (id) => {
        axios( {
            url: `https://chargeit.herokuapp.com/booking/${id}`,
            method: "post",
          })
          .then((response)=> {
            console.log(response)
          })
          .catch( (error)=> {
            console.log(error);
          });

        }
    
    submitEdit = () => {
        axios( {
            url: `https://chargeit.herokuapp.com/booking/edit/${this.state.modalBookingid}/${this.state.EditChosenTiming}`,
            method: "post",
          })
          .then((response)=> {
            console.log(response)
            this.setState({
                modalisOpen: !this.state.modalisOpen
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
            <Dropdown className='mt-2 ml-2'isOpen={this.state.dropdownOpenStation} toggle={this.toggleStation}>
                <DropdownToggle caret>
                {
                    this.state.ChosenStation ?
                    this.state.ChosenStation:
                    'Choose Station'
                }
                </DropdownToggle>
                <DropdownMenu>
                    {
                        this.state.Stations.map(station =>
                            <DropdownItem onClick={()=>{this.setChosenStation(station.name, station.id)}}>{station.name}</DropdownItem>
                            )
                    }
                </DropdownMenu>
            </Dropdown>
            <Dropdown className='mt-2 ml-2'isOpen={this.state.dropdownOpenPump} toggle={this.togglePump}>
                <DropdownToggle caret>
                {
                    this.state.ChosenPump ?
                    this.state.ChosenPump:
                    'Choose Pump'
                }
                </DropdownToggle>
                <DropdownMenu>
                    {
                        this.state.Pump_object.map(pump =>
                            this.state.ChosenStation == pump.station_name ?
                                <DropdownItem onClick={()=>{this.setChosenPump(pump.pump_name, pump.id)}}>{pump.pump_name}</DropdownItem>:
                            null
                        )
                    }
                </DropdownMenu>
            </Dropdown>
            <Dropdown className='mt-2 ml-2'isOpen={this.state.dropdownOpentiming} toggle={this.toggletiming}>
                <DropdownToggle caret>
                {
                    this.state.ChosenTiming ?
                    this.state.ChosenTiming:
                    'Choose Timing'
                }
                </DropdownToggle>
                <DropdownMenu>
                    <div style={{ height:'50vh', overflow:'auto'}}>
                        {
                            this.state.timings.map(timing =>
                            <DropdownItem onClick={()=>{this.setChosenTiming(timing)}}>{timing}</DropdownItem>
                            )
                        }
                    </div>
                </DropdownMenu>
            </Dropdown>
            <Button onClick={this.storeTiming} type="submit" className="mt-2 ml-2">Submit</Button>
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
                                                object.user_id?
                                                object.user_id:
                                                'not booked'
                                            }
                                        </h5>
                                        <Button onClick={()=>{this.ActivateModal(object.id, object.station_name, object.pump_name)}}>Edit timing</Button>
                                        <Button style={{backgroundColor:'maroon'}} className="ml-2" onClick={()=>{this.deleteTiming(object.id)}} type="submit">Delete</Button>
                                    </div>
                                <hr/>
                            </>
                        )
                    }
                </div>

            <Modal isOpen={this.state.modalisOpen} >
                <div className="mt-2 ml-2">
                    <h5>{this.state.modalStationName}</h5>
                    <h5>{this.state.modalPumpName}</h5>
                </div>
                <Dropdown className='mt-2 ml-2 mb-2'isOpen={this.state.Edittiming} toggle={this.toggleEditiming}>
                    <DropdownToggle caret>
                    {
                        this.state.ChosenTiming ?
                        this.state.ChosenTiming:
                        'Choose Timing'
                    }
                    </DropdownToggle>
                    <DropdownMenu>
                        <div style={{ height:'50vh', overflow:'auto'}}>
                            {
                                this.state.timings.map(timing =>
                                <DropdownItem onClick={()=>{this.EditChosenTiming(timing)}}>{timing}</DropdownItem>
                                )
                            }
                        </div>
                    </DropdownMenu>
                </Dropdown>
                <div>
                    <Button onClick={this.submitEdit} type="submit" className="ml-2 mt-2 mb-2">Submit</Button>
                    <Button onClick={this.closemodal} className="ml-2 mt-2 mb-2">Close</Button>
                </div>
            </Modal>
        </>
        )
        }
    }

export default ManageTiming;
