import React, { Component }  from 'react';
import axios from 'axios';

class Geocoding extends Component{
    constructor(props){

        super(props)
        this.state ={
            places: ['Kajang Malaysia', 'Presinct 11 Malaysia', 'Balakong Malaysia', 'Bandar Baru Bangi Malaysia'],
        }

    }

    componentDidMount() {
        // performing a GET request to '/api-end-point'
        this.state.places.map(place =>
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyCz2XfFOJs5LX94xX69vyj0TqZOmsw6p1c`)
            .then(result => {
            // If successful, we do stuffs with 'result'
            this.props.getLocation(result.data.results[0].geometry.location.lng, result.data.results[0].geometry.location.lat)
            })
            .catch(error => {
            // If unsuccessful, we notify users what went wrong
            console.log('ERROR: ', error)
            })
        )
        
    }

    render() {
        return (
            <></>
        )
    }
}

export default Geocoding