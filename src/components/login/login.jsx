import React from "react";
import Cookies from "js-cookie";

import stylesCSS from "./styles.module.css";
import BiggerLogo from "./../resources/images/Bigger-logo.png";

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

    componentDidMount(){
        if(Cookies.get("jwt")!==undefined){
            window.location.href = "/exams";
        }
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
            alert(data.message);
        }
        else{
            // console.log(data);
            Cookies.set("jwt",data.jwt);
            window.location.href = "/exams";
        }
    }

    render(){
        return (
            <div>
                <div className={stylesCSS.cardContainer}>
                    <div className={stylesCSS.cardForm}>
                        <img src={BiggerLogo} alt="logo"/>
                        <h3>Examiner Login</h3>
                        <input className={stylesCSS.input} type="text" name="" id="username" placeholder="Username" required onChange={this.formChange}/>
                        <input className={stylesCSS.input} type="password" name="" id="password" placeholder="Password" required onChange={this.formChange}/>
                        <a href="/signup">Create Account</a>
                        <button className={stylesCSS.button} onClick={this.loginButtonHandler}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;