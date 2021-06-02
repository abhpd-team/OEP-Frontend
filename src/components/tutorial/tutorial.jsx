import stylesCSS from "./styles.module.css";
import { useState } from "react";

// Importing Components
import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";

// Importing resources
import classLogo from "./../resources/images/classLogo.svg";
import exam from "./../resources/images/exam.svg";
import question from "./../resources/images/question.svg";

export default function Tutorial(props) {
  const sections = [
    {
      icon: classLogo,
      step: 1,
      sectionHeading: "Create or Import Classes",
      subHeading1: "Create a new class",
      text1: "Choose a name for your new class and click on create!",
      subHeading2: "Add or Import Students",
      text2: "Add students individually or Import via Excal Sheet",
      gif2: "https://lh3.googleusercontent.com/HuOYdXtUR84XCJ2uPIfKYR2xYIQtHOpGqE2eA3EvW0ecHivbZoP3-NnF-HCAUezw98B_NCWt5UxIO5HySD-0b9H61mDg4lqRKDbdux3wFePGeimWHo7DkrmdU-xbPkdcqU9AqvhB=w2400",
      gif1: "https://lh3.googleusercontent.com/laKiCIOPvc2LdWI0gZUR0YAuPm960iWLXE_RV4fP9MQqke51CXPYoudTEwORcCStqECY8TAGLm5mRipXKHtM45_z0oFe6d8mDbyZYC4yAs2mx9ODgZRG6FELEtE_bDh-uMDJki0X=w2400",
      alt: "class-icon",
    },
    {
      icon: question,
      step: 2,
      sectionHeading: "Create or Import Question Bank",
      subHeading1: "Create a Question Bank",
      text1: "Choose a name for your new Question Bank and click on create! ",
      subHeading2: "Add or Import Questions",
      text2: "Add Questions individually or Import via Excel Sheet",
      gif2: "https://lh3.googleusercontent.com/9wqxMQgmlHfNdThZfv30XpWE5FRLI7tbP5VTaQelg4IoAiqAGndQGr5iWMhIcZ4Vp9J1nbCkN0SI8ow7KBlrTfcuRDOUIx2XKSl81ufmb-CM-4652J-XvaXJJxlxdNJw2aWRh4ty=w2400",
      gif1: "https://lh3.googleusercontent.com/avI4GYdY5AXbEq8IAYiZYcqAcE-qk-12L1dw6luZA8UpdRt9D0Oc9zM32iE3AxIFnH6kUgINnLj6mjm0WGR_RBPNmAS4tfqilzos0XzB8yXNbsTcSajw0jAX01FuxMwrPKHEU7fz=w2400",
      alt: "questionBank-icon",
    },
    {
      icon: exam,
      step: 3,
      sectionHeading: "Start Exam",
      subHeading1: "Create Exam",
      text1:
        " Choose class, Question Bank and start and end date time and then hit create. As soon as you create an exam, candidates in your class will recieve their login credentials on their respective emails",
      subHeading2: "Open to view Result and Student Credentials",
      text2:
        "You can view result and other  details for the exam. Also you can view the details of the candidates.",
      gif1: "https://lh3.googleusercontent.com/4jVKN8fkihzhNaPyOQBvXsLp0hqMVrQvtkuhvGvqCy8UMrGgiZacN2ujP9c46gEF5BIIfWhAvRIw5uVabdbZCh8d9waeaarBLrtDkxfho6qetA5sX88huqszUh7dlU1__mSHW6nw=w2400",
      gif2: "https://lh3.googleusercontent.com/HTCBaQUhcOC8d8jy9ux8uyJj7xltjnt1rF-qe3BHUWvmlwuq3jTSb3H2QOF8ZHnEXt_0Rryv7wxCiz6-4FNiOY16WEbs3yLWb_6CAC7FiBuaYPL5P5N8NQab9SEjd6QDnTuTjlsR=w2400",
      alt: "exam-icon",
    },
  ];
  const initialState = sections[0];
  const [state, setState] = useState(initialState);
  const button1Handler = () => {
    setState({ ...sections[0] });
  };
  const button2Handler = () => {
    setState({ ...sections[1] });
  };
  const button3Handler = () => {
    setState({ ...sections[2] });
  };
  return (
    <div>
      <Navbar />
      <div className="container-fluid text-center">
        <div className="row py-5">
          <div className="col">
            <div className="row pt-5  ">
              <div
                className={"col-12 h1 font-weight-bold " + stylesCSS.tutorial}
              >
                Tutorial
              </div>

              <div className="col-12 font-weight-bold pb-4">
                Just 3 steps to start an exam.
              </div>
            </div>
            <div
              className={
                "row px-3 pt-3 d-flex justify-content-center " +
                stylesCSS.iconContainer
              }
            >
              <div className="col-2 col-md-1 p-0">
                <a
                  href="#section"
                  onClick={button1Handler}
                  className={
                    stylesCSS.icon +
                    "  d-flex align-items-center justify-content-center " +
                    (state.step === 1 ? stylesCSS.active : " ")
                  }
                >
                  <i class="fas fa fa-chalkboard-teacher "></i>
                </a>
              </div>
              <div className="col-2 col-md-1 p-0 d-flex align-items-center justify-content-center">
                <i className="fas fa-long-arrow-alt-right fa-2x "></i>
              </div>
              <div className="col-2 col-md-1 p-0">
                <a
                  href="#section"
                  onClick={button2Handler}
                  className={
                    stylesCSS.icon +
                    "  d-flex align-items-center justify-content-center " +
                    (state.step === 2 ? stylesCSS.active : " ")
                  }
                >
                  <i class="fas fa fa-clipboard-list"></i>
                </a>
              </div>
              <div className="col-2 col-md-1 p-0 d-flex align-items-center justify-content-center">
                <i className="fas fa-long-arrow-alt-right fa-2x "></i>
              </div>
              <div className="col-2 col-md-1 p-0 ">
                <a
                  href="#section"
                  onClick={button3Handler}
                  className={
                    stylesCSS.icon +
                    "  d-flex align-items-center justify-content-center " +
                    (state.step === 3 ? stylesCSS.active : " ")
                  }
                >
                  <i class="fas fa-edit"></i>
                </a>
              </div>
            </div>
            <div className="row px-3 pt-md-3 d-flex justify-content-center">
              <div className={"col-2 col-md-1 p-0 " + stylesCSS.buttonText}>
                Create Class
              </div>
              <div className="col-2 col-md-1 p-0 d-flex align-items-center justify-content-center"></div>
              <div className={"col-2 col-md-1 p-0 " + stylesCSS.buttonText}>
                Create Question Bank
              </div>
              <div className="col-2 col-md-1 p-0 d-flex align-items-center justify-content-center"></div>
              <div className={"col-2 col-md-1 p-0 " + stylesCSS.buttonText}>
                Start Exam
              </div>
            </div>

            <div className="row p-5"></div>
          </div>
        </div>
        <div className="row p-3 py-5 bg-white " id="section">
          <div className="col text-center  ">
            <div className="row  p-5">
              <div className="col-12 col-md-2 p-2">
                <img
                  src={state.icon}
                  className="img-fluid pb-md-5"
                  alt={state.alt}
                />
              </div>

              <div className="col-12 col-md-10 text-md-left pt-4">
                <div className="row">
                  <div
                    className={
                      "col  text-secondary font-weight-bold pt-md-1 " +
                      stylesCSS.step
                    }
                  >
                    {"Step " + state.step}
                  </div>
                </div>
                <div className="row">
                  <div className={"col pb-md-5 h1 " + stylesCSS.sectionHeading}>
                    {state.sectionHeading}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 offset-md-1 pt-md-5 mt-md-5">
                <div className="row">
                  <div
                    className={"col text-left pt-md-3 " + stylesCSS.subHeading}
                  >
                    {state.subHeading1}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-secondary text-left py-2 font-weight-bold ">
                    {state.text1}
                  </div>
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <img
                  src={state.gif1}
                  alt={"gif-" + state.alt}
                  className="img-fluid my-4 rounded"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 offset-md-1 pt-md-5 mt-md-5">
                <div className="row">
                  <div
                    className={"col text-left pt-md-3  " + stylesCSS.subHeading}
                  >
                    {state.subHeading2}
                  </div>
                </div>
                <div className="row">
                  <div className="col text-secondary text-left py-2 font-weight-bold ">
                    {state.text2}
                  </div>
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <img
                  src={state.gif2}
                  alt={"gif-" + state.alt}
                  className="img-fluid my-4 rounded "
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 text-center py-4 mt-4">
            <p>
              Made with ❤️ by, <br />
              Abhishek Prasad |
              <a href="https://www.linkedin.com/in/abhpd/">Linkedin</a> |
              <a href="https://abhpd.github.io/">Github</a>| <br /> Anubhav
              Sharma |
              <a href="https://www.linkedin.com/in/anubhav-sharma-0356641b6/">
                Linkedin
              </a>
              |<a href=" https://github.com/19BCS1114">Github </a>| <br />
              Chanchal Mishra |
              <a href="https://www.linkedin.com/in/">Linkedin </a>|
              <a href=" https://github.com/chnlmshr">Github </a>|
            </p>
          </div>
          <div className={"col-md-6 text-center py-4 mt-md-4"}>
            <p className={stylesCSS.contacts}>
              Undergraduate Students at <br /> Chandigarh University. <br />{" "}
              <br />
              Contact us at
              <br />
              <a href="mailto:abhpdmail@gmail.com">abhpdmail@gmail.com</a>{" "}
              <br />{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
