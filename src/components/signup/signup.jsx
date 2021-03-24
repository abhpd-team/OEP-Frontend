import React from "react";
import stylesCSS from "./styles.module.css";
import logo from "../resources/BiggerLogo2.png";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
    this.formChange = this.formChange.bind(this);
    this.signupButtonHandler = this.signupButtonHandler.bind(this);
  }

  formChange() {
    this.setState({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      repeatPassword: document.getElementById("repeatpassword").value,
    });
  }

  async signupButtonHandler() {
    if (this.state.password === this.state.repeatPassword) {
      console.log(this.state.username);
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(this.state.repeatPassword);

      const response = await fetch(
        process.env.REACT_APP_API_URI + "/login/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        }
      );

      const data = await response.json();

      console.log(data.message);
    }
  }

  render() {
    return (
      <div className={stylesCSS.signup}>
        <div className={stylesCSS.signupcontainer}>
          <form action="">
            <img className={stylesCSS.logo} src={logo} alt="logo" />
            <h1>Examiner Signup</h1>
            <div className={stylesCSS.txtfield}>
              <input
                type="text"
                name=""
                placeholder="Username"
                id="username"
                required
                onChange={this.formChange}
              />
            </div>
            <div className={stylesCSS.txtfield}>
              <input
                type="text"
                name=""
                placeholder="Email"
                id="email"
                required
                onChange={this.formChange}
              />
            </div>
            <div className={stylesCSS.txtfield}>
              <input
                type="text"
                name=""
                placeholder="Password"
                id="password"
                required
                onChange={this.formChange}
              />
            </div>
            <div className={stylesCSS.txtfield}>
              <input
                type="text"
                name=""
                placeholder="Repeat Password"
                id="repeatpassword"
                required
                onChange={this.formChange}
              />
            </div>
            <button
              className={stylesCSS.signupbutton}
              onClick={this.signupButtonHandler}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
