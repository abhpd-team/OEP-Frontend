import React from "react";
import stylesCSS from "./styles.module.css";
import smallLogo from "../resources/SmallLogo1.png";
import bigLogo from "../resources/BiggerLogo1.png";
import handimage from "../resources/hand.png";
import control from "../resources/control.png";

class Landing extends React.Component {
  render() {
    return (
      <div className={stylesCSS.landing}>
        <div className="container">
          <div className="row">
            <div className="col-md-4  vertical-align-center mt-3">
              <img src={smallLogo} alt="logo" />
            </div>
            <div
              className={`col-md-4 offset-md-4  vertical-align-center mt-5 ${stylesCSS.welcome}`}
            >
              Welcome!
            </div>
          </div>
        </div>
        <img className={stylesCSS.bigLogo} src={bigLogo} alt="logo" />
        <p className={stylesCSS.motto}>Secure, Reliable & easy to use.</p>
        <div className={stylesCSS.buttons}>
          <a href="/login">
            <button className={stylesCSS.button}>login</button>
          </a>
          <a href="/signup">
            <button className={stylesCSS.button}>signup</button>
          </a>
        </div>
        <div className={stylesCSS.second}>
          <img src={handimage} alt="img" />

          <h1>Ease of Use</h1>
          <p>
            We know the stuggle of examiners who had to take online exams,
            therefore,
            <br /> we made this whole system with ease of use as our primary
            concern.
          </p>
        </div>
        <div className={stylesCSS.third}>
          <img src={control} alt="img" />

          <h1>Control, all yours.</h1>
          <p>
            Create and save classes, question bank and choose when to show the
            result.
            <br /> You also get detailed result of the whole class and on a per
            student basis
          </p>
        </div>
        <div className={stylesCSS.fourth}>
          <h1 className="font-weight-bold">Other Features</h1>
          <div className="container">
            <div className="row">
              <div className="col">
                <h4 className="font-weight-bold text-center">
                  Automatic exam URL
                </h4>
                <p className="text-center text-justify">
                  As soon as you create an exam, the system generates a unique
                  URL you can share with candidates to take the exam.
                </p>
              </div>
              <div className="col">
                <h4 className="font-weight-bold text-center">
                  Reuse your Data
                </h4>
                <p className="text-center">
                  The system is tailored such that you maximize the use of your
                  data by saving question banks and class details which you can
                  edit whenever you need to
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="font-weight-bold text-center">
                  Results on your control
                </h4>
                <p className="text-center text-justify">
                  The system also allows to that you can choose if the
                  candidates can see their results at exit or when you release.
                </p>
              </div>
              <div className="col">
                <h4 className="font-weight-bold text-center">
                  Automatic login details
                </h4>
                <p className="text-center">
                  As soon as you create an exam, the system also generates
                  unique login details for all your class candidates and shares
                  on their respective emails.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesCSS.footer}>
          <p>Copyright© 2020 @ abhpd-team. All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}
export default Landing;
