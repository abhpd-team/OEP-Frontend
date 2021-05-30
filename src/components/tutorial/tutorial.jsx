import stylesCSS from "./styles.module.css";
import { useState } from "react";
import classLogo from "./../resources/images/classLogo.svg";
import exam from "./../resources/images/exam.svg";
import question from "./../resources/images/question.svg";
import arrowRight from "./../resources/images/rightArrow.svg";

// Importing Components
import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";

// Importing resources
import BannerLogo from "./../resources/images/Bigger-logo.png";

//<i class="fa-solid fa-folder-plus"></i>
//<i class="fa-solid fa-list"></i>
//<i class="fa-solid fa-clipboard"></i>

export default function Tutorial(props) {
  const sections = [
    {
      icon: "fa-folder-plus",
      sectionHeading: "Create or Import Class",
      subHeading1: "Create a new class",
      text1: "Choose a name for your new class and click on create!",
      subHeading2: "Add or Import Students",
      text2: "Add students individually or Import via Excal Sheet",
      gif1: "",
      gif2: "",
    },
    {
      icon: "fa-list",
      sectionHeading: "Create or Import Question Bank",
      subHeading1: "Create a Question Bank",
      text1: "Choose a name for your new Question Bank and click on create! ",
      subHeading2: "Add or Import Questions",
      text2: "Add Questions individually or Import via Excel Sheet",
      gif1: "",
      gif2: "",
    },
    {
      icon: "fa-clipboard",
      sectionHeading: "Start Exam",
      subHeading1: "Create Exam",
      text1:
        " Choose class, Question Bank and start and end date time and then hit create. As soon as you create an exam, candidates in your class will recieve their login credentials on their respective emails",
      subHeading2: "Open to view Result and Student Credentials",
      text2:
        "You can view result and other  details for the exam. Also you can view the details of the candidates.",
      gif1: "",
      gif2: "",
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
        <div className="row bg-grey">
          <div className="col">
            <div className="row pt-5  ">
              <div className="col h1 ">Tutorial</div>
            </div>
            <div className="row">
              <div className="col">Just 3 steps to start an exam.</div>
            </div>
            <div className="row p-3">
              <div className="col-3">
                <button
                  className={stylesCSS.buttonIcon}
                  onClick={button1Handler}
                >
                  <img src={classLogo} className="img-fluid" alt="class-icon" />
                </button>
              </div>
              <div className="col-1 ">
                {/* <img src={arrowRight} className="img-fluid" alt="arrow-icon" /> */}
                <i class="fas fa-arrow-right "></i>
              </div>
              <div className="col-3 ">
                <button
                  className={stylesCSS.buttonIcon}
                  onClick={button2Handler}
                >
                  <img
                    src={question}
                    className="img-fluid"
                    alt="question-icon"
                  />
                </button>
              </div>
              <div className="col-1  ">
                {/* <img src={arrowRight} className="img-fluid" alt="arrow-icon" /> */}
                <i class="fas fa-arrow-right"></i>
              </div>
              <div className="col-3  ">
                <button
                  className={stylesCSS.buttonIcon}
                  onClick={button3Handler}
                >
                  <img src={exam} className="img-fluid" alt="exam-icon" />
                </button>
              </div>
            </div>
            <div className="row p-5"></div>
          </div>
        </div>

        <div className="row">
          <div className="col">div</div>
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
