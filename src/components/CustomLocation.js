import React, { Component } from 'react';
import { Button } from 'reactstrap'
import '../App.css';


class CustomLocation extends Component {

  render() 
  {
    return (
        <>
            <Button onClick={this.props.closeModal}>Close</Button>
        </>

    )
  }
}

export default CustomLocation;
