import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Redirect} from "react-router-dom";
import axios from 'axios'
import '../App.css';


class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email:"",
            password:"",
            login: false,
            userlogin: false,
            adminlogin: false
            }
      }
    
      nameInputHandler =(event)=>{
        this.setState({username:event.target.value})
      }
  
      emailInputHandler =(event)=>{
        this.setState({email:event.target.value})
      }
  
      passwordInputHandler =(event)=>{
        this.setState({password: event.target.value})
      }

      handleSubmit = () =>{
        let signupdata ={
            username: this.state.username,
            email: this.state.email,
            password:this.state.password,
          }
          
          // debugger  
          axios.post(`https://chargeit.herokuapp.com/users/new`, signupdata)
          .then((response) => {
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('user_id', response.data.user.id)
            localStorage.setItem('JWT', response.data.access_token)
            // this.setState({login:true})
            if (response.data.user.username != 'admin'){
              this.setState({ 
                login:true,
                userlogin: true
              })
            } else if (response.data.user.username === 'admin'){
              this.setState({
                login:true, 
                adminlogin: true
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      }


  render() 
  {
    if (this.state.login === true && this.state.userlogin){
        return <Redirect to='/Dashboard/Home'/>
      } 
    else if (this.state.login === true && this.state.adminlogin){
        return <Redirect to='/Dashboard/Admin/ManageStation'/>
      }
    else{
      return (
        <Form>
            <FormGroup className="m-2">
                <Label for="username">Username</Label>
                <Input type="text" id="username" placeholder="username" onChange={this.nameInputHandler} />
            </FormGroup>
            <FormGroup className="m-2">
                <Label for="exampleEmail">Email</Label>
                <Input type="email" id="exampleEmail" placeholder="name@example.com" onChange={this.emailInputHandler} />
            </FormGroup>
            <FormGroup className="m-2">
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onChange={this.passwordInputHandler} />
            </FormGroup>
            <Button className="m-2" onClick={this.handleSubmit} >Submit</Button>
        </Form>
    )
     } 
    

  }
}

export default SignUp;
