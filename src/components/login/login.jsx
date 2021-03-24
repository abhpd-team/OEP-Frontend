import React from "react";
import Cookies from "js-cookie";

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

    async loginButtonHandler(){
        console.log(this.state.username);
        console.log(this.state.password);

        const response = await fetch(process.env.REACT_APP_API_URI+"/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        const data = await response.json();

        if(data.message){
            console.log(data.message);
        }
        else{
            // console.log(data);
            Cookies.set("jwt",data.jwt);
        }
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                <p>Username: </p><input type="text" name="" id="username" required onChange={this.formChange}/>
                <p>Password: </p><input type="password" name="" id="password" required onChange={this.formChange}/>
                <button type="submit" onClick={this.loginButtonHandler}>Login</button>
            </div>
        );
    }
}

export default Login;