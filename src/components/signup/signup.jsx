import React from "react";
import Cookies from "js-cookie";

import stylesCSS from "./styles.module.css";
import BiggerLogo from "./../resources/images/Bigger-logo.png";

class Signup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username:"",
            email:"",
            password:"",
            repeatPassword:""
        }
        this.formChange = this.formChange.bind(this);
        this.signupButtonHandler = this.signupButtonHandler.bind(this);
    }

    componentDidMount(){
        if(Cookies.get("jwt")!==undefined){
            window.location.href = "/exams";
        }
    }

    formChange(){
        this.setState({
            username: (document.getElementById("username").value===null)?"":document.getElementById("username").value,
            email: (document.getElementById("email").value===null)?"":document.getElementById("email").value,
            password: (document.getElementById("password").value===null)?"":document.getElementById("password").value,
            repeatPassword: (document.getElementById("repeatPassword").value===null)?"":document.getElementById("repeatPassword").value,
        });
    }

    async signupButtonHandler(){
        
        if(this.state.password===this.state.repeatPassword && this.state.username!=="" && this.state.email!=="" && this.state.password!=="" && this.state.repeatPassword!==""){
            console.log(this.state.username);
            console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.repeatPassword);

            const response = await fetch(process.env.REACT_APP_API_URI + "/login/signup",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            });

            const data = await response.json();

            if(data.message === "Signup success"){
                alert("Signup Success, please login to continue.")
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        } else{
            alert("Not valid Inputs please check again.");
        }
    }

    render(){
        return (
            <div>
                <div className={stylesCSS.cardContainer}>
                    <div className={stylesCSS.cardForm}>
                        <img src={BiggerLogo} alt="logo"/>
                        <h3>Examiner Signup</h3>
                        <input className={stylesCSS.input} type="text" name="" id="username" placeholder="Username" required onChange={this.formChange}/>
                        <input className={stylesCSS.input} type="email" name="" id="email" placeholder="Email" required onChange={this.formChange}/>
                        <input className={stylesCSS.input} type="password" name="" id="password" placeholder="Password" required onChange={this.formChange}/>
                        <input className={stylesCSS.input} type="password" name="" id="repeatPassword" placeholder=" Repeat Password" required onChange={this.formChange}/>
                        <a href="/login">Already have an account</a>
                        <button className={stylesCSS.button} onClick={this.signupButtonHandler}>Signup</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;