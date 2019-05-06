import React, { Component } from 'react';
import {Button, Modal} from 'reactstrap';
import SignUp from './SignUp'
import Login from './Login'
import '../App.css';


class Homepage extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      showModal: false,
      showLoginModal: false,
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  toggleLoginModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
  }


  render() 
  {
    return (
        <div style={{width:'100vw', height:'100vh', backgroundColor: '#5D6D7E'}}>
          <div className="text-center" >
            <h1 style={{fontSize:'200px', color:'white'}} >Charge.it</h1>
            <h1>Book a spot now!</h1>
            <Button className="mr-4 mt-4" style={{width:'15vw'}} onClick={this.toggleLoginModal}>Login</Button>
            <Button className="mr-4 mt-4" style={{width:'15vw'}} onClick={this.toggleModal}>Sign Up</Button>
          </div>
          <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
            <SignUp/>
          </Modal>
          <Modal isOpen={this.state.showLoginModal} toggle={this.toggleLoginModal}>
            <Login/>
          </Modal>

        </div>
    )
  }
}

export default Homepage;
