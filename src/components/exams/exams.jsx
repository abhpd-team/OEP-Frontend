import React, { Component } from "react";
import moment from "moment";

import stylesCSS from "./styles.module.css";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import PageHeader from "./../modules/pageHeader/pageHeader";
import SearchBar from "./../modules/searchBar/searchBar";
import ExamCard from "./../modules/examCard/examCard";

import Cookies from "js-cookie";

class Exams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newExamForm: {
        examName: "",
        startTime: new Date(),
        endTime: new Date(),
        date: new Date(),
        questionBankId: "",
        classId: "",
      },
      upcoming: true,
    };
    this.fetchData = this.fetchData.bind(this);
    this.addNewExam = this.addNewExam.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
    this.inputToggler = this.inputToggler.bind(this);
    this.examButtonToggler = this.examButtonToggler.bind(this);
  }
  inputToggler(event) {
    event.target.type = event.target.name;
  }
  examButtonToggler(event) {
    event.target.style.backgroundColor = "#ffe600";
    if (event.target.id === "examButton1") {
      document.getElementById("examButton2").style.backgroundColor = "#c4c4c4";
      this.setState({ ...this.state, upcoming: true });
    } else {
      document.getElementById("examButton1").style.backgroundColor = "#c4c4c4";
      this.setState({ ...this.state, upcoming: false });
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
      alert("Please Login to continue");
      window.location.href = "/login";
      return;
    }

    this.setState((state) => {
      return {
        examinerId: data._id,
        classes: data.classes,
        questionBanks: data.questionBanks,
        exams: data.exams,
      };
    });
  }

  async componentDidMount() {
    await this.fetchData();
    this.setState({ loading: false });
  }

  async addNewExam() {
    console.log(moment());

    const newExamName = document.getElementById("newExamName").value;
    const newExamClassId = document.getElementById("newExamClass").value;
    const newExamQuestionBankId = document.getElementById(
      "newExamQuestionBank"
    ).value;

    // Converting time to UTC
    const newExamStartDateTime = moment(
      String(document.getElementById("newExamStartDateTime").value)
    ).toISOString();
    const newExamEndDateTime = moment(
      String(document.getElementById("newExamEndDateTime").value)
    ).toISOString();

    console.log(newExamName);
    console.log(newExamClassId);
    console.log(newExamQuestionBankId);
    console.log(newExamStartDateTime);
    console.log(newExamEndDateTime);

    if (
      newExamName !== "" &&
      newExamClassId !== "" &&
      newExamQuestionBankId !== "" &&
      newExamStartDateTime !== null &&
      newExamEndDateTime !== null &&
      moment(newExamStartDateTime).isBefore(newExamEndDateTime)
    ) {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "/exams/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer ".concat(Cookies.get("jwt")),
          },
          body: JSON.stringify({
            newExam: {
              examName: newExamName,
              startDateTime: newExamStartDateTime,
              endDateTime: newExamEndDateTime,
              questionBankId: newExamQuestionBankId,
              classId: newExamClassId,
            },
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      await this.fetchData();

      document.getElementById("newExamName").value = "";
      document.getElementById("newExamClass").value = "";
      document.getElementById("newExamQuestionBank").value = "";
      document.getElementById("newExamStartDateTime").value = "";
      document.getElementById("newExamEndDateTime").value = "";
    }
  }

  async deleteExam(id, examName) {
    var confirm = window.confirm(
      `Confirm to Delete the Exam ${examName} and lose all results.`
    );

    if (confirm) {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "/exams/del",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer ".concat(Cookies.get("jwt")),
          },
          body: JSON.stringify({
            examId: id,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      await this.fetchData();
    }
  }

  render() {
    return (
      <div>
        <Navbar current="Exams" />
        <PageHeader header="Exams" />
        <SearchBar placeholder="Search for Exam" parent="exams" />
        <div className="container ">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <button
                id="examButton1"
                className={
                  "m-2 btn py-1 px-3 px-md-5 " +
                  stylesCSS.inactiveButton +
                  " " +
                  stylesCSS.activeButton
                }
                onClick={this.examButtonToggler}
              >
                Upcoming
              </button>
              <button
                id="examButton2"
                className={
                  "m-2 btn py-1 px-4 px-md-5 " + stylesCSS.inactiveButton
                }
                onClick={this.examButtonToggler}
              >
                Previous
              </button>
            </div>
          </div>

          <div className={stylesCSS.listBlock}>
            {this.state.loading
              ? "Loading, please wait ..."
              : this.state.exams.map((e, indx) => {
                  if (
                    this.state.upcoming === true &&
                    moment().isBefore(e.startDateTime)
                  )
                    return (
                      <ExamCard
                        key={indx}
                        examinerId={this.state.examinerId}
                        title={e.examName}
                        date={moment(e.startDateTime)
                          .local()
                          .format("MMMM Do YYYY, h:mm:ss a")}
                        examId={e._id}
                        deleteExam={() => {
                          this.deleteExam(e._id, e.examName);
                        }}
                      />
                    );
                  else if (
                    this.state.upcoming === false &&
                    moment().isAfter(e.startDateTime)
                  )
                    return (
                      <ExamCard
                        key={indx}
                        examinerId={this.state.examinerId}
                        title={e.examName}
                        date={moment(e.startDateTime)
                          .local()
                          .format("MMMM Do YYYY, h:mm:ss a")}
                        examId={e._id}
                        deleteExam={() => {
                          this.deleteExam(e._id, e.examName);
                        }}
                      />
                    );
                })}
          </div>

          <div className="row">
            <div className="col text-center font-weight-bolder h4 pt-3">
              Create new Exam
            </div>
          </div>
          <div className={"row " + stylesCSS.addExam}>
            <div className="col-md-4 text-center px-1 d-flex ">
              <input
                type="text"
                name="name"
                placeholder="Exam Name"
                id="newExamName"
              />
            </div>
            <div className="col-md-4 text-center  px-1 d-flex">
              <select name="" id="newExamClass">
                <option value="" disabled selected hidden>
                  Class
                </option>
                {this.state.loading
                  ? ""
                  : this.state.classes.map((e, indx) => {
                      return (
                        <option key={indx} value={e._id}>
                          {e.className}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="col-md-4 text-center d-flex px-1">
              <select name="" id="newExamQuestionBank">
                <option value="" disabled selected hidden>
                  Question Bank
                </option>
                {this.state.loading
                  ? ""
                  : this.state.questionBanks.map((e, indx) => {
                      return (
                        <option key={indx} value={e._id}>
                          {e.questionBankName}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="col-md-6 text-center px-1 d-flex ">
              <input
                type="text"
                name="datetime-local"
                placeholder="Start Time"
                id="newExamStartDateTime"
                onFocus={this.inputToggler}
              />
            </div>
            <div className="col-md-6 text-center px-1 d-flex ">
              <input
                type="text"
                name="datetime-local"
                placeholder="End Time"
                id="newExamEndDateTime"
                onFocus={this.inputToggler}
              />
            </div>
          </div>

          <div className="row">
            <div className="col text-center ">
              <button
                className={`${stylesCSS.addButton} ${stylesCSS.addQuestion}`}
                onClick={this.addNewExam}
              >
                Create new Exam
              </button>
            </div>
          </div>
        </div>
        <footer className={stylesCSS.footerContainer}>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Exams;
