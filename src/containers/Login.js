import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Redirect} from "react-router-dom";
import axios from 'axios'
import '../App.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        username: "",
        email:"",
        password:"",
        login: false
        }
  }

  nameInputHandler =(event)=>{
    this.setState({username:event.target.value})
  }

  passwordInputHandler =(event)=>{
    this.setState({password: event.target.value})
  }

  handleSubmit = () => {
    const data ={
      username: this.state.username,
      password: this.state.password,
    }
    axios.post(`https://chargeit.herokuapp.com/users/login`, data)
        .then((response)=> {
          localStorage.setItem('username', response.data.user.username)
          localStorage.setItem('user_id', response.data.user.id)
          localStorage.setItem('JWT', response.data.access_token)
          this.setState({login:true})
          
        })
        .catch(function (error) {
          console.log(error);
        });

  } 



  render() 
  {
    if (this.state.login === true){
      return <Redirect to='/Dashboard/Home'/>
    }
    else{
      return (
          <Form>
              <FormGroup className="m-2">
                  <Label for="exampleEmail">Username</Label>
                  <Input type="text" id="exampleEmail" placeholder="username" onChange={this.nameInputHandler}/>
              </FormGroup>
              <FormGroup className="m-2">
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.passwordInputHandler} />
              </FormGroup>
              <Button className="m-2" onClick={this.handleSubmit}>Submit</Button>
          </Form>
      )
    }
  }
}

export default Login;
