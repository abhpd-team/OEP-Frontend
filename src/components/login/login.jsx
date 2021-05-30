import React from "react";
import Cookies from "js-cookie";
// import Navbar from "./../modules/navbar/navbar";
import stylesCSS from "./styles.module.css";
import BannerLogo from "./../resources/images/Bigger-logo.png";

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

  async loginButtonHandler(event) {
    event.preventDefault();
    console.log(process.env.REACT_APP_API_URI);
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
    console.log(data.message);
    if (data.message) {
      alert(data.message);
    } else {
      // console.log(data);
      Cookies.set("jwt", data.jwt);
      window.location.href = "/exams";
    }
  }

  render() {
    return (
      // <div>
      //     <div className={stylesCSS.cardContainer}>
      //         <div className={stylesCSS.cardForm}>
      //             <img src={BiggerLogo} alt="logo"/>
      //             <h3>Examiner Login</h3>
      //             <input className={stylesCSS.input} type="text" name="" id="username" placeholder="Username" required onChange={this.formChange}/>
      //             <input className={stylesCSS.input} type="password" name="" id="password" placeholder="Password" required onChange={this.formChange}/>
      //             <a href="/signup">Create Account</a>
      //             <button className={stylesCSS.button} onClick={this.loginButtonHandler}>Login</button>
      //         </div>
      //     </div>
      // </div>

      <div className="container">
        <div className="row m-5"></div>
        <div className="row m-md-5"></div>
        <div className="row">
          <div
            className={
              "col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 shadow-lg bg-white  py-5  text-center px-0 " +
              stylesCSS.border
            }
          >
            <div className="row py-3">
              <div className="col-6 offset-3">
                <img src={BannerLogo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col text-center text-secondary font-weight-bold h5">
                Login
              </div>
            </div>
            <form>
              <div className="form-group">
                <div className="col-md-6 offset-md-3">
                  <input
                    className={"form-control " + stylesCSS.input}
                    type="text"
                    name=""
                    id="username"
                    placeholder="Username"
                    required
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="form-group mb-1">
                <div className="col-md-6 offset-md-3">
                  <input
                    className={"form-control " + stylesCSS.input}
                    type="password"
                    name=""
                    id="password"
                    placeholder="Password"
                    required
                    onChange={this.formChange}
                  />
                </div>
              </div>
              <div className="col-12 text-secondary">
                <a href="/signup">Create Account</a>
              </div>
              <button
                className={stylesCSS.button}
                onClick={this.loginButtonHandler}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
