import React from "react";
import stylesCSS from "./styles.module.css";
import smallLogo from "../resources/SmallLogo1.png";
import bigLogo from "../resources/BiggerLogo1.png";
import handimage from "../resources/hand.png";
import control from "../resources/control.png";

class Landing extends React.Component {
  render() {
    return (
      <div className={"container-fluid mycontainer"}>
        <div className={"row " + stylesCSS.bgGrey}>
          <div className="col-12 ">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-light row">
                  <div className="col-6">
                    <img
                      src={smallLogo}
                      width="60"
                      height="70"
                      className="d-inline-block align-top  pt-3"
                      alt=""
                    />
                  </div>

                  <div className="col-6 d-flex">
                    <div
                      className={"pt-3 ml-auto welcome " + stylesCSS.welcome}
                    >
                      <h4>Welcome!</h4>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <img
                  className={`img-fluid  center-block `}
                  src={bigLogo}
                  width="800"
                  height="300"
                  alt="logo"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <h4>Secure, Reliable & easy to use.</h4>
              </div>
            </div>
            <div className="row pb-5">
              <div className="col-12">
                <div className="d-flex justify-content-center ">
                  <div className="p-2">
                    <a href="/login">
                      <button
                        className={"btn btn-secondary " + stylesCSS.btncustom}
                      >
                        Login
                      </button>
                    </a>
                  </div>
                  <div className="p-2">
                    <a href="/signup">
                      <button
                        className={"btn btn-secondary " + stylesCSS.btncustom}
                      >
                        Signup
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 pb-5 bg-white">
          <div className="col-12 text-center ">
            <div className="row ">
              <div className="col-12 ">
                <img
                  className="img-fluid  center-block"
                  src={handimage}
                  width="150"
                  height="150"
                  alt="img"
                />
              </div>
            </div>
            <div className="row ">
              <div className={"col-12 " + stylesCSS.customstrong}>
                {" "}
                Ease of Use{" "}
              </div>
            </div>
            <div className="row  ">
              <div className="col-12 ">
                We know the struggle of examiners who had to take online exams,
                therefore,
                <br /> we made this whole system with ease of use as our primary
                concern.
              </div>
            </div>
          </div>
        </div>
        <div className={"row  pt-5 pb-5 " + stylesCSS.bgGrey}>
          <div className="col-12 text-center ">
            <div className="row ">
              <div className="col-12 ">
                <img
                  className="img-fluid  center-block"
                  width="150"
                  height="150"
                  src={control}
                  alt="img"
                />
              </div>
            </div>
            <div className="row ">
              <div className={"col-12 " + stylesCSS.customstrong}>
                Control, all yours.
              </div>
            </div>
            <div className="row  ">
              <div className="col-12 ">
                Create and save classes, question bank and choose when to show
                the result.
                <br /> You also get detailed result of the whole class and on a
                per student basis
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 pb-5 bg-white">
          <div className="col">
            <div className="row">
              <div className="col ">
                <h1 className="font-weight-bold text-center">Other Features</h1>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-sm-6">
                <h3 className="font-weight-bold text-center">
                  Automatic exam URL
                </h3>
                <p className="text-center p-2 ">
                  As soon as you create an exam, the system <br /> generates a
                  unique URL you can share with <br /> candidates to take the
                  exam.
                </p>
              </div>
              <div className="col-sm-6">
                <h3 className="font-weight-bold text-center">
                  Automatic login details
                </h3>
                <p className="text-center p-2">
                  As soon as you create an exam, the system also
                  <br /> generates unique login details for all your class
                  <br /> candidates and shares on their respective emails.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 ">
                <h3 className="font-weight-bold text-center">
                  Reuse your Data
                </h3>
                <p className="text-center p-2">
                  The system is tailored such that you maximize the <br /> use
                  of your data by saving question banks and <br />
                  class details which you can edit whenever you
                  <br /> need to.
                </p>
              </div>
              <div className="col-sm-6">
                <h3 className="font-weight-bold text-center">
                  Results on your control
                </h3>
                <p className="text-center p-2">
                  The system also allows to that you can choose if <br />
                  the candidates can see their results at exit or when <br />
                  you release.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"row " + stylesCSS.bgGrey}>
          <div className="col-sm-8 pt-3">
            <p>
              Made with ❤️ by,
              <br />
              Abhishek Kumar Prasad |
              <a href="https://www.linkedin.com/in/abhpd/">Linkedin</a> |
              <a href="https://abhpd.github.io/">Github</a> |
              <a href="https://twitter.com/abhpd">Twitter </a> |<br />
              Anubhav Sharma |
              <a href="https://www.linkedin.com/in/anubhav-sharma-0356641b6/">
                Linkedin
              </a>
              |<a href=" https://github.com/19BCS1114">Github</a> |
            </p>
          </div>
          <div className="col-sm-4 text-right">
            <p>
              Undergraduate Students at <br />
              Chandigarh University
              <br />
              Contact us at email
              <br />
              @gmail.com
              <br /> +91 8463011560
            </p>
          </div>
        </div>
        <div className="row text-white bg-dark ">
          <div className="col text-center p-3 ">
            Copyright©️ 2020 @ abhpd-team. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
