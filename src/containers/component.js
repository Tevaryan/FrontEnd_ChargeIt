import React, { Component }  from 'react';
import axios from 'axios';
import ReactMapboxGl, { Layer, Popup, Marker} from "react-mapbox-gl";


class PopUp extends React.Component{
    constructor(props){

        super(props)
        this.state ={
            place: ''
        }

    }

    componentDidMount(){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.location[1]},${this.props.location[0]}&key=AIzaSyABpJnHD8sFlbKFmbQ4wgfTEqat3AjGqY0`)
        .then(result => {
            // If successful, we do stuffs with 'result'
            this.setState({
                 place: result.data.plus_code.compound_code
                 })
            })
        .catch(error => {
            // If unsuccessful, we notify users what went wrong
            console.log('ERROR: ', error)
            })
            
    }
    
    render() {
        return (
            <>
            {
                this.state.place ? 
                <Popup
                coordinates={this.props.location}
                offset={{
                'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                    }}>
                    <button onClick = {() => {this.props.clickedAgain(this.props.location)}}>X</button>
                </Popup> :
                null
            }
            </>
        )
    }
    
}

export default PopUp