import React from "react";
import stylesCSS from "./styles.module.css";
import smallLogo from "../resources/SmallLogo1.png";
import bigLogo from "../resources/BiggerLogo2.png";

import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div className={stylesCSS.login}>
        <img className={stylesCSS.smallLogo} src={smallLogo} alt="logo" />
        Welcome!
        <div className={stylesCSS.bigLogo}>
          <img className={stylesCSS.bigLogo} src={bigLogo} alt="logo" />
        </div>
        <div className={stylesCSS.motto}>
          Secure, Reliable & easy to use.
          <div className={stylesCSS.buttons}>
            <button
              className={stylesCSS.button}
            >
             <Link to="/login"> Login</Link>
            </button>
            <button
              className={stylesCSS.button}
            >
             <Link to="/signup">signup</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
