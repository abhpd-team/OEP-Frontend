import React, { Component } from "react";
import moment from "moment";

import stylesCSS from "./styles.module.css";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import HeaderBar from "./../modules/headerBar/headerBar";

import Cookies from "js-cookie";

class Exams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.fetchData = this.fetchData.bind(this);
    this.appearedCount = this.appearedCount.bind(this);
    this.accordianHeaderColor = this.accordianHeaderColor.bind(this);
  }

  accordianHeaderColor(event) {
    const id = event.target.innerHTML;

    const cardHeaders = document.getElementsByClassName("card-header");
    for (let i = 0; i < cardHeaders.length; i++) {
      if (cardHeaders[i].id === "heading" + id) {
        cardHeaders[i].style.opacity = 1;
      } else {
        cardHeaders[i].style.opacity = 0.8;
      }
    }
  }

  async fetchData() {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "/exams/getall",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer ".concat(Cookies.get("jwt")),
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      //if we dont get exmas from server but got a message
      console.log(data.message);
      window.location.href = "/login";
      return;
    }

    const examId = this.props.match.params.examId;

    function findExam() {
      for (let index = 0; index < data.exams.length; index++) {
        const element = data.exams[index];
        if (element._id === examId) {
          return element;
        }
      }
    }

    const foundExam = findExam();

    this.setState((state) => {
      return {
        examinerId: data._id,
        exam: foundExam,
        questionBanks: data.questionBanks,
        // classes: data.classes,
      };
    });
  }

  async componentDidMount() {
    await this.fetchData();
    this.setState({ loading: false });
  }

  appearedCount = () => {
    var count = 0;
    for (let i = 0; i < this.state.exam.candidates.length; i++) {
      const element = this.state.exam.candidates[i];
      if (element.hasAppeared) {
        count++;
      }
    }
    return count;
  };

  copyTextFromCardLinkURL(event) {
    var tempInput = document.createElement("input");
    tempInput.value = document.getElementById(
      event.target.dataset.examid
    ).innerHTML;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    alert("Text Copied: " + tempInput.value);
    document.body.removeChild(tempInput);
  }

  render() {
    return (
      <div>
        <Navbar current="Exams" />
        <div className={stylesCSS.listBlock}>
          {this.state.loading ? (
            "Loading, please wait ..."
          ) : (
            <div className={stylesCSS.examDetails}>
              <HeaderBar
                backHref="/exams"
                header={this.state.exam.examName}
                sideHeader={`${this.appearedCount()} of ${
                  this.state.exam.candidates.length
                } Appeared`}
              />

              <div className="container">
                <div className="row mb-3 bg-white rounded">
                  <div
                    className={
                      "col-10 col-md-11  pr-0 pl-2   pt-2 " +
                      stylesCSS.cardLinkURLclass
                    }
                    id={this.state.exam._id}
                  >
                    {`${process.env.REACT_APP_FRONTEND_URL}/examlive/${this.state.examinerId}/${this.state.exam._id}`}
                  </div>

                  <div
                    className={
                      "col-2 col-md-1 d-flex justify-content-center p-0 " +
                      stylesCSS.cardLinkCopy
                    }
                    onClick={this.copyTextFromCardLinkURL}
                    data-examid={this.state.exam._id}
                  >
                    Copy
                  </div>
                </div>

                <div className="row py-4">
                  <div
                    className={
                      "col-md-8 col-lg-6 offset-md-2 offset-lg-3 text-center py-2 " +
                      stylesCSS.schedule
                    }
                  >
                    <div className="row">
                      <div className="col-5 pr-0 font-weight-bold">
                        Question Bank:
                      </div>
                      <div className="col-7 pr-0 font-weight-bold ">
                        {
                          this.state.questionBanks.find(
                            (ele) => ele._id === this.state.exam.questionBankId
                          ).questionBankName
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 pr-0 font-weight-bold ">
                        Start Date & Time:
                      </div>
                      <div className="col-7 pr-0 font-weight-bold ">
                        {moment(this.state.exam.startDateTime)
                          .local()
                          .format("MMMM Do YYYY, h:mm a")}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5 pr-0 font-weight-bold ">
                        End Date & Time:
                      </div>
                      <div className="col-7 pr-0 font-weight-bold ">
                        {moment(this.state.exam.endDateTime)
                          .local()
                          .format("MMMM Do YYYY, h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={stylesCSS.tableHeader + " h3 pt-4"}>
                  Result & Details
                </div>
                <div
                  className={
                    "text-center my-3 font-weight-bold " +
                    stylesCSS.sideHeaderMobile
                  }
                >{`${this.appearedCount()} of ${
                  this.state.exam.candidates.length
                } Appeared`}</div>
                <table className={stylesCSS.table}>
                  <thead>
                    <tr className={stylesCSS.tableRow}>
                      <th scope="col">Unique Id</th>
                      <th scope="col">Exam Password</th>
                      <th scope="col">Name</th>
                      <th scope="col">Appeared</th>
                      <th scope="col">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.exam.candidates.map((e, indx) => {
                      return (
                        <tr
                          key={indx}
                          className={`${stylesCSS.tableRow} ${stylesCSS.tableEntry}`}
                        >
                          <td className={stylesCSS.td}>{e.candidateId}</td>
                          <td className={stylesCSS.td}>
                            {e.candidatePassword}
                          </td>
                          <td className={stylesCSS.td}>{e.candidateName}</td>
                          <td
                            className={`${stylesCSS.td} ${
                              e.hasAppeared
                                ? stylesCSS.greenTd
                                : stylesCSS.redTd
                            }`}
                          >
                            {e.hasAppeared ? "YES" : "NO"}
                          </td>
                          <td
                            className={stylesCSS.td}
                          >{`${e.Marks}/${this.state.exam.totalMarks}`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className={stylesCSS.accordianToggle}>
                  <div>
                    <div className="accordion mt-4" id="accordionExample">
                      {this.state.exam.candidates.map((e) => {
                        return (
                          <div key={e.candidateId}>
                            <div
                              className={"card my-1 " + stylesCSS.accordianCard}
                            >
                              <div
                                className={
                                  "card-header text-center py-1 " +
                                  stylesCSS.accordianHeader +
                                  " " +
                                  (e.hasAppeared
                                    ? stylesCSS.greenTd
                                    : stylesCSS.redTd)
                                }
                                id={"heading" + e.candidateId}
                              >
                                <h2 className="mb-0 font-weight-bold">
                                  <button
                                    onClick={this.accordianHeaderColor}
                                    className="btn m-0"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target={"#collapse" + e.candidateId}
                                    aria-expanded="false"
                                    aria-controls={"collapse" + e.candidateId}
                                  >
                                    {e.candidateId}
                                  </button>
                                </h2>
                              </div>

                              <div
                                id={"collapse" + e.candidateId}
                                className="collapse"
                                aria-labelledby={"heading" + e.candidateId}
                                data-parent="#accordionExample"
                              >
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col d-flex justify-content-between">
                                      <span>
                                        <strong>Unique Id: </strong>
                                      </span>
                                      <span> {e.candidateId}</span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-between">
                                      <span>
                                        <strong>Password: </strong>
                                      </span>
                                      <span>{e.candidatePassword}</span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-between">
                                      <span>
                                        <strong>Name: </strong>
                                      </span>
                                      <span> {e.candidateName}</span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-between">
                                      <span>
                                        <strong>Appeared: </strong>
                                      </span>
                                      <span>
                                        {e.hasAppeared ? "YES" : "NO"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-between">
                                      <span>
                                        <strong>Marks: </strong>
                                      </span>
                                      <span>
                                        {`${e.Marks}/${this.state.exam.totalMarks}`}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={stylesCSS.footerContainer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Exams;
