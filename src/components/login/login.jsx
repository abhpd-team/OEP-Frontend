import React from "react";
import Cookies from "js-cookie";
import stylesCSS from "./styles.module.css";
import logo from "../resources/BiggerLogo2.png";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    this.formChange = this.formChange.bind(this);
    this.loginButtonHandler = this.loginButtonHandler.bind(this);
  }

  formChange() {
    this.setState({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    });
  }

  async loginButtonHandler() {
    console.log(this.state.username);
    console.log(this.state.password);

    const response = await fetch(process.env.REACT_APP_API_URI + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    });

    const data = await response.json();

    // console.log(data);
    Cookies.set("jwt", data.jwt);
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row m-5"></div>
        <div className="row">
          <div className={`col-6 offset-3 box ${stylesCSS.box}`}>
            <div className="row m-2">
              <div className="col-12 display-4">
                <img className="img-fluid" src={logo} alt="logo" />
              </div>
            </div>
            <div className="row my-4">
              <div className={`col-12 header ${stylesCSS.header}`}>
                Examination Login
              </div>
            </div>
            <form className="mb-5">
              <div className="row form-group">
                <input
                  type="text"
                  id="username"
                  placeholder="Username:"
                  required
                  onChange={this.formChange}
                  className={`form-control col-6 offset-3 input-box ${stylesCSS.inputBox}`}
                />
              </div>
              <div className="row form-group mt-4">
                <input
                  type="password"
                  placeholder="Password:"
                  id="password"
                  required
                  onChange={this.formChange}
                  className={`form-control col-6 offset-3 input-box ${stylesCSS.inputBox}`}
                />
              </div>
              <div className="row form-group my-4">
                <div className="col-12">
                  <button
                    className={`btn-login ${stylesCSS.btnLogin}`}
                    onClick={this.loginButtonHandler}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
