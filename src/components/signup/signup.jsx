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
      <div className="container text-center">
        <div className="row">
          <div className={`col-6 offset-3 mt-4 box ${stylesCSS.box}`}>
            <div className="row m-2">
              <div className="col-12 display-4">
                <img className="img-fluid" src={logo} alt="logo" />
              </div>
            </div>
            <div className="row my-4">
              <div className={`col-12 header ${stylesCSS.header}`}>
                Examination Signup
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
                  type="Email"
                  placeholder="Email:"
                  id="email"
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
              <div className="row form-group mt-4">
                <input
                  type="password"
                  placeholder="Repeat Password:"
                  id="repeatPassword"
                  required
                  onChange={this.formChange}
                  className={`form-control col-6 offset-3 input-box ${stylesCSS.inputBox}`}
                />
              </div>
              <div className="row form-group my-4">
                <div className="col-12">
                  <button
                    className={`btn-signup ${stylesCSS.btnSignup}`}
                    onClick={this.signupButtonHandler}
                  >
                    Signup
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

export default Signup;
