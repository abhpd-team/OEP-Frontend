import React from "react";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password:""
        }
        this.formChange = this.formChange.bind(this);
        this.loginButtonHandler = this.loginButtonHandler.bind(this);
    }

    formChange(){
        this.setState({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        });
    }

    loginButtonHandler(){
        console.log(this.state.username);
        console.log(this.state.password);
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                <input type="text" name="" id="username" required onChange={this.formChange}/>
                <input type="text" name="" id="password" required onChange={this.formChange}/>
                <button onClick={this.loginButtonHandler}></button>
            </div>
        );
    }
}

export default Login;