import React, { Component }  from 'react';
import axios from 'axios';


class Distance extends Component{
    constructor(props){

        super(props)
        this.state ={
            distance: '',
            estimated_time: ''
        }

    }

    componentDidMount() {
        // performing a GET request to '/api-end-point'
        //axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.props.start},DC&destinations=${this.props.destination}&key=AIzaSyABpJnHD8sFlbKFmbQ4wgfTEqat3AjGqY0`, {headers: {"Access-Control-Allow-Origin": "*"}})
        axios({
            method: "post", 
            url:'http://localhost:5000/getdistance', 
            headers: {
                "Content-Type": 'application/json'
            },
            data:{
                start: this.props.start,
                destination: this.props.destination
            }
        }).then((response) => {
            console.log(response.data.rows[0].elements[0].distance.text)
            console.log(response.data.rows[0].elements[0].duration.text)
          // If successful, we do stuffs with 'result'
          this.setState({
            distance: response.data.rows[0].elements[0].distance.text,
            estimated_time: response.data.rows[0].elements[0].duration.text
          })

        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log('ERROR: ', error)
        })
        
    }

    render() {
        return (
            <div>
                <h5>distance from your location:{this.state.distance}</h5>
                <h5>estiamted time of your journey:{this.state.estimated_time}</h5>
            </div>
        )
    }
}

export default Distance