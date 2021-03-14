import React from "react";

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

    formChange(){
        this.setState({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            repeatPassword: document.getElementById("repeatpassword").value,
        });
    }

    async signupButtonHandler(){
        if(this.state.password===this.state.repeatPassword){
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

            console.log(data.message);
        }
    }

    render(){
        return (
            <div>
                <h1>Signup</h1>
                <p>Username: </p><input type="text" name="" id="username" required onChange={this.formChange}/>
                <p>Email: </p><input type="text" name="" id="email" required onChange={this.formChange}/>
                <p>Password: </p><input type="text" name="" id="password" required onChange={this.formChange}/>
                <p>Repeat Password: </p><input type="text" name="" id="repeatpassword" required onChange={this.formChange}/>
                <button onClick={this.signupButtonHandler}>Signup</button>
            </div>
        );
    }
}

export default Signup;