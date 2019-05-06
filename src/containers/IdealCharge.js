import React, { Component } from 'react';
import {Button} from 'reactstrap'
import '../App.css';


class IdealCharge extends Component {

  render() 
  {
    return (
        <Button onClick={this.props.closeModal}>Close</Button>
    )
  }
}

export default IdealCharge;
