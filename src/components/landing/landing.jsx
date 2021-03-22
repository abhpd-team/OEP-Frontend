import React from "react";
import stylesCSS from "./styles.module.css";
import smallLogo from "../resources/SmallLogo1.png";
import bigLogo from "../resources/BiggerLogo2.png";
import handimage from "../resources/hand.png";
import control from "../resources/control.png";

import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div className={stylesCSS.landing}>
        <div className={stylesCSS.first}>
          <img className={stylesCSS.smallLogo} src={smallLogo} alt="logo" />
          <span className={stylesCSS.welcome}>Welcome!</span>
          <div className={stylesCSS.bigLogo}>
            <img className={stylesCSS.bigLogo} src={bigLogo} alt="logo" />
          </div>
          <div className={stylesCSS.motto}>
            Secure, Reliable & easy to use.
            <div className={stylesCSS.buttons}>
              <button className={stylesCSS.button}>
                <Link to="/login"> Login</Link>
              </button>
              <button className={stylesCSS.button}>
                <Link to="/signup">signup</Link>
              </button>
            </div>
          </div>
        </div>
        <div className={stylesCSS.second}>
          <img className={stylesCSS.handimage} src={handimage} alt="img" />
          <div className={stylesCSS.belowImage}>
            <h1>Ease of Use</h1>
            <p>
              {" "}
              We know the stuggle of examiners who had to take online exams,
              therefore, we made this whole system with ease of use as our
              primary concern.
            </p>
          </div>
        </div>
        <div className={stylesCSS.third}>
          <img className={stylesCSS.control} src={control} alt="img" />
          <div className={stylesCSS.belowImage}>
            <h1>Control, all yours.</h1>
            <p>
              Create and save classes, question bank and choose when to show the
              result. You also get detailed result of the whole class and on a
              per student basis
            </p>
          </div>
        </div>
        <div className={stylesCSS.fourth}>
          <h1>Other Features</h1>
          <span className={stylesCSS.subheading}>
            Automatic exam URL Automatic login details
          </span>
          <br />
          <span className={stylesCSS.content}>
            As soon as you create an exam, the system generates a unique URL you
            can share with candidates to take the exam. As soon as you create an
            exam, the system also generates unique login details for all your
            class candidates and shares on their respective emails.
          </span>
          <br />
          <span className={stylesCSS.subheading}>
            Reuse your Data Results on your control
          </span>
          <br />
          <span className={stylesCSS.content}>
            The system is tailored such that you maximize the use of your data
            by saving question banks and class details which you can edit
            whenever you need to. The system also allows to that you can choose
            if the candidates can see their results at exit or when you release.
          </span>
        </div>
        <div className={stylesCSS.footer}>
          <p>Copyright© 2020 @ abhpd-team. All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}
export default Landing;
