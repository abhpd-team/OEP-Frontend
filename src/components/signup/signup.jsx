import React from "react";

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:"",
            repeatPassword:""
        }
        this.formChange = this.formChange.bind(this);
        this.loginButtonHandler = this.loginButtonHandler.bind(this);
    }

    formChange(){
        this.setState({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            repeatPassword: document.getElementById("repeatpassword").value,
        });
    }

    loginButtonHandler(){
        if(this.state.password===this.state.repeatPassword){
            console.log(this.state.username);
            console.log(this.state.password);
            console.log(this.state.repeatPassword);
        }
    }

    render(){
        return (
            <div>
                <h1>Signup</h1>
                <p>Username: </p><input type="text" name="" id="username" required onChange={this.formChange}/>
                <p>Password: </p><input type="text" name="" id="password" required onChange={this.formChange}/>
                <p>Repeat Password: </p><input type="text" name="" id="repeatpassword" required onChange={this.formChange}/>
                <button onClick={this.loginButtonHandler}>Signup</button>
            </div>
        );
    }
}

export default Signup;