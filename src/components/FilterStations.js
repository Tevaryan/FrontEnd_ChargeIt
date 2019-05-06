import React, { Component } from 'react';
import { Button } from 'reactstrap'
import '../App.css';


class FilterStations extends Component {

  render() 
  {
    return (
        <>
            <Button onClick={this.props.closeModal}>Close</Button>
        </>

    )
  }
}

export default FilterStations;