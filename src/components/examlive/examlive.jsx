import React, { Component } from "react";
import moment from "moment";

import BiggerLogo from "./../resources/images/Bigger-logo.png";
import MediumLogo from "./../resources/images/Logo-medium.png";
import BannerLogo from "./../resources/images/Bigger-logo.png";

import Footer from "./../modules/footer/footer";

import stylesCSS from "./styles.module.css";

class ExamLive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // In login
      examinerId: this.props.match.params.examinerId,
      examId: this.props.match.params.examId,

      // in questions page
      loadingQuestions: true,
      startDateTime: "",
      endDateTime: "",
      questionBank: {},
      candidateId: "",
      candidatePassword: "",
      responses: [],

      currentQuestionIndex: 0,
      answeredIndexes: [],
      markedIndexes: [],
      timeRemaining: "",

      // result
      resultScreen: false,
      result: {
        candidateName: "Abhishek Kumar Prasad",
        Marks: 12,
        examName: "MST 3",
        examinerName: "Teacher",
        examinerEmail: "teacher@cuchd.in",
      },
    };

    this.fetchQuestionBank = this.fetchQuestionBank.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
    this.questionChangeHandler = this.questionChangeHandler.bind(this);
    this.generatelisArr = this.generatelisArr.bind(this);

    this.previousButtonHandler = this.previousButtonHandler.bind(this);
    this.nextButtonHandler = this.nextButtonHandler.bind(this);

    this.markHandler = this.markHandler.bind(this);
    this.isCorrectOption = this.isCorrectOption.bind(this);
    this.setColor = this.setColor.bind(this);

    this.startTimer = this.startTimer.bind(this);

    this.submitResponses = this.submitResponses.bind(this);
  }

  // fetching questions for the exam
  async fetchQuestionBank() {
    // console.log(`${this.state.candidateId} ${this.state.candidatePassword}`);
    const response = await fetch(
      process.env.REACT_APP_API_URI + "/examlive/getexam",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examinerId: this.state.examinerId,
          examId: this.state.examId,
          candidateId: this.state.candidateId,
          candidatePassword: this.state.candidatePassword,
        }),
      }
    );

    const data = await response.json();

    if (data.message) {
      alert(data.message);
      window.history.back();
    } else {
      // console.log(moment(data.startDateTime).format());
      // console.log(moment(data.endDateTime).format());
      // console.log(JSON.stringify(data.questionBank));

      this.setState((state) => {
        return {
          startDateTime: moment(data.startDateTime).format(),
          endDateTime: moment(data.endDateTime).format(),
          questionBank: data.questionBank,

          loadingQuestions: false,
        };
      });
    }
  }

  startTimer() {
    var eventTime, currentTime, duration, interval, intervalId;

    eventTime = moment(this.state.endDateTime);

    interval = 1000; // 1 second

    currentTime = moment();

    duration = moment.duration(eventTime.diff(currentTime));

    intervalId = setInterval(
      function () {
        // get updated duration
        duration = moment.duration(duration - interval, "milliseconds");

        // console.log(duration);

        // if duration is >= 0
        if (duration.asSeconds() <= 0) {
          clearInterval(intervalId);
          // hide the countdown element
          this.setState((state) => {
            return {
              timeRemaining: `0:0:0`,
            };
          });
        } else {
          // otherwise, show the updated countdown
          this.setState((state) => {
            return {
              timeRemaining: `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`,
            };
          });
        }
      }.bind(this),
      interval
    );
  }

  async loginRequestHandler() {
    const candidateId = String(document.getElementById("candidateId").value);
    const candidatePassword = String(
      document.getElementById("candidatePassword").value
    );

    // console.log(`${candidateId} ${candidatePassword}`);

    await this.setState((state) => {
      return {
        candidateId: candidateId,
        candidatePassword: candidatePassword,
      };
    });

    if (candidateId !== "" && candidatePassword !== "") {
      await this.fetchQuestionBank();
    }

    this.startTimer();
  }

  // takes index of question
  questionChangeHandler(index) {
    this.setState({
      currentQuestionIndex: index,
    });
  }

  // Records responses to the state
  async recordResponse(questionId, optionId) {
    // console.log(`${questionId} ${optionId}`);
    const foundResponse = this.state.responses.find(
      (response) => response.questionId === questionId
    );

    if (foundResponse !== undefined) {
      for (let i = 0; i < this.state.responses.length; i++) {
        if (this.state.responses[i].questionId === questionId) {
          if (this.state.responses[i].optionId === optionId) {
            //click on same option so we remove

            await this.setState((state) => {
              // console.log("click on same option so we remove");
              var newState = JSON.parse(JSON.stringify(state));
              newState.responses.splice(i, 1);

              const answeredArrIndx = newState.answeredIndexes.indexOf(
                this.state.currentQuestionIndex
              );

              if (answeredArrIndx > -1) {
                newState.answeredIndexes.splice(answeredArrIndx, 1);
              }

              return newState;
            });
          } else {
            //click on a new option of the same question so we update the optionId

            await this.setState((state) => {
              // console.log("click on a new option of the same question so we update the optionId");
              var newState = JSON.parse(JSON.stringify(state));

              newState.responses.splice(i, 1);

              newState.responses.push({
                questionId: questionId,
                optionId: optionId,
              });

              return newState;
            });
          }
          break; //might save an issue
        }
      }
    } else {
      // a new quesiton response
      await this.setState((state) => {
        var newState = JSON.parse(JSON.stringify(state));

        newState.responses.push({
          questionId: questionId,
          optionId: optionId,
        });

        newState.answeredIndexes.push(this.state.currentQuestionIndex);

        return newState;
      });
    }
    // console.log(this.state.responses);
    // console.log(this.state.answeredIndexes);
  }

  async previousButtonHandler() {
    if (
      this.state.currentQuestionIndex - 1 >= 0
    )
      await this.setState((state) => {
        return {
          currentQuestionIndex: state.currentQuestionIndex - 1,
        };
      });
  }

  async nextButtonHandler() {
    if (
      this.state.currentQuestionIndex + 1 <
      this.state.questionBank.questions.length
    )
      await this.setState((state) => {
        return {
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      });
  }

  async markHandler() {
    if (
      this.state.markedIndexes.indexOf(this.state.currentQuestionIndex) >= 0
    ) {
      //unmarking the question
      await this.setState((state) => {
        var newState = JSON.parse(JSON.stringify(state));

        const answeredArrIndx = newState.markedIndexes.indexOf(
          this.state.currentQuestionIndex
        );

        if (answeredArrIndx > -1) {
          newState.markedIndexes.splice(answeredArrIndx, 1);
        }

        return newState;
      });
    } else {
      await this.setState((state) => {
        var newState = JSON.parse(JSON.stringify(state));

        newState.markedIndexes.push(this.state.currentQuestionIndex);

        return newState;
      });
    }

    console.log(this.state.markedIndexes);
  }

  isCorrectOption(questionId, optionId) {
    const foundResponse = this.state.responses.find(
      (response) =>
        response.questionId === questionId && response.optionId === optionId
    );

    if (foundResponse) {
      return true;
    } else {
      return false;
    }
  }

  async submitResponses() {
    var confirm = window.confirm("Sure you want to submit the responses?");

    if (confirm) {
      const request = {
        examinerId: this.state.examinerId,
        examId: this.state.examId,
        candidateId: this.state.candidateId,
        candidatePassword: this.state.candidatePassword,

        responses: JSON.parse(JSON.stringify(this.state.responses)),
      };

      const response = await fetch(
        process.env.REACT_APP_API_URI + "/examlive/getresult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );

      // console.log(request);

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        this.setState((state) => {
          return {
            resultScreen: true,
            result: data,
          };
        });
      }
    }
  }

  // Render Helpers below this

  setColor(index) {
    if (index === this.state.currentQuestionIndex) {
      return `${stylesCSS.yellow}`;
    } else {
      if (this.state.markedIndexes.indexOf(index) >= 0) {
        return `${stylesCSS.lightViolet}`;
      } else {
        if (this.state.answeredIndexes.indexOf(index) >= 0) {
          return `${stylesCSS.lightGreen}`;
        } else {
          return ``;
        }
      }
    }
  }

  generatelisArr() {
    var listArr = [];

    if (this.state.questionBank.questions) {
      for (
        let index = 0;
        index < this.state.questionBank.questions.length;
        index++
      ) {
        listArr.push(
          <div
            key={index}
            className={`${stylesCSS.questionIndex} ${this.setColor(index)}`}
            onClick={() => {
              this.questionChangeHandler(index);
            }}
          >
            <p>{index + 1}</p>
          </div>
        );
      }
    }

    return listArr;
  }

  render() {
    // const candidateLogin = ;

    return (
      <div>
        {this.state.resultScreen ? (
          <div className={stylesCSS.resultPage}>
            <div className={stylesCSS.reportContainer}>
              <img src={BiggerLogo} className={stylesCSS.topImage} alt="" />
              <p className={stylesCSS.reportDate}>
                {moment().format("MMMM Do YYYY")}
              </p>
              <div className={stylesCSS.candidateInfoMobile}>
                <h2>{this.state.result.candidateName}</h2>
                <p>has scored</p>
                <h2>
                  {this.state.result.Marks}/
                  {this.state.questionBank.questions
                    ? this.state.questionBank.questions.length
                    : ""}
                </h2>{" "}
                <p> in </p> <h2>{this.state.result.examName}</h2>
              </div>
              <div className={stylesCSS.candidateInfo}>
                <div className={stylesCSS.displayAsRow}>
                  <h2>{this.state.result.candidateName}</h2>
                  <p>
                    {" "}
                    has <br />
                  </p>
                </div>
                <div className={stylesCSS.displayAsRow}>
                  <p>scored </p>
                  <h2>
                    {this.state.result.Marks}/
                    {this.state.questionBank.questions
                      ? this.state.questionBank.questions.length
                      : ""}
                  </h2>{" "}
                  <p> in </p> <h2>{this.state.result.examName}</h2>
                </div>
              </div>
              <div className={stylesCSS.infograph}>
                <center>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>
                            <b>Total</b>
                          </p>
                        </td>
                        <td>
                          <div className={stylesCSS.infoBarContainer}>
                            <div
                              className={stylesCSS.infoBar}
                              style={{
                                width:
                                  this.state.questionBank.questions.length * 5 +
                                  "px",
                              }}
                            ></div>
                            <p>
                              <b>{this.state.questionBank.questions.length}</b>
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            <b>Attempts</b>
                          </p>
                        </td>
                        <td>
                          <div className={stylesCSS.infoBarContainer}>
                            <div
                              className={stylesCSS.infoBar}
                              style={{
                                width: this.state.responses.length * 5 + "px",
                              }}
                            ></div>
                            <p>
                              <b>{this.state.responses.length}</b>
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            <b>Correct</b>
                          </p>
                        </td>
                        <td>
                          <div className={stylesCSS.infoBarContainer}>
                            <div
                              className={stylesCSS.infoBar}
                              style={{
                                width: this.state.result.Marks * 5 + "px",
                              }}
                            ></div>
                            <p>
                              <b>{this.state.result.Marks}</b>
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            <b>Wrong</b>
                          </p>
                        </td>
                        <td>
                          <div className={stylesCSS.infoBarContainer}>
                            <div
                              className={stylesCSS.infoBar}
                              style={{
                                width:
                                  (this.state.responses.length -
                                    this.state.result.Marks) *
                                    5 +
                                  "px",
                              }}
                            ></div>
                            <p>
                              <b>
                                {this.state.responses.length -
                                  this.state.result.Marks}
                              </b>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={stylesCSS.examinerInfo}>
                <div className={stylesCSS.displayAsRow}>
                  <p>Taken By, </p>
                </div>
                <div className={stylesCSS.displayAsRow}>
                  <h2>{this.state.result.examinerName}</h2>
                </div>
                <div className={stylesCSS.displayAsRow}>
                  <p>{this.state.result.examinerEmail}</p>
                </div>
              </div>
            </div>
            <footer>
              <Footer />
            </footer>
          </div>
        ) : this.state.candidateId === "" &&
          this.state.candidatePassword === "" &&
          this.state.loadingQuestions ? (

          // Candidate Login
          <div>
            <div className={"container " + stylesCSS.formBoxBackground}>
              <div className="row m-md-5"></div>
              <div className="row m-5"></div>
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
                      Candidate Login
                    </div>
                  </div>
                  <form>
                    <div className="form-group">
                      <div className="col-md-6 offset-md-3">
                        <input
                          className={"form-control " + stylesCSS.input}
                          type="text"
                          name=""
                          id="candidateId"
                          placeholder="Id"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mb-1">
                      <div className="col-md-6 offset-md-3">
                        <input
                          className={"form-control " + stylesCSS.input}
                          type="password"
                          name=""
                          id="candidatePassword"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className={stylesCSS.button}
                      onClick={this.loginRequestHandler}
                    >
                      Start Exam
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={stylesCSS.examPageContainer}>
            <div className={stylesCSS.topBar}>
              <div className={stylesCSS.logoContainer}>
                <img src={MediumLogo} alt="logo" />
              </div>
              <div className={stylesCSS.questionsAttemptDetails}>
                <div className={stylesCSS.infoStack}>
                  <div className={stylesCSS.infoItem}>
                    <h1>
                      {this.state.questionBank.questions
                        ? this.state.questionBank.questions.length
                        : ""}
                    </h1>
                  </div>
                  <div className={stylesCSS.infoName}>
                    <p>Total Questions</p>
                  </div>
                </div>
                <div className={stylesCSS.infoStack}>
                  <div className={stylesCSS.infoItem}>
                    <h1>{this.state.answeredIndexes.length}</h1>
                  </div>
                  <div
                    className={`${stylesCSS.infoName} ${stylesCSS.darkgreen}`}
                  >
                    <p>Answered</p>
                  </div>
                </div>
                <div className={stylesCSS.infoStack}>
                  <div className={stylesCSS.infoItem}>
                    <h1>{this.state.markedIndexes.length}</h1>
                  </div>
                  <div
                    className={`${stylesCSS.infoName} ${stylesCSS.darkviolet}`}
                  >
                    <p>Marked</p>
                  </div>
                </div>
                <div className={stylesCSS.infoStack}>
                  <div className={stylesCSS.infoItem}>
                    <h1>
                      {this.state.questionBank.questions
                        ? this.state.questionBank.questions.length -
                          this.state.answeredIndexes.length
                        : ""}
                    </h1>
                  </div>
                  <div className={`${stylesCSS.infoName} ${stylesCSS.darkred}`}>
                    <p>Unanswered</p>
                  </div>
                </div>
              </div>
              <div className={stylesCSS.timeRemaining}>
                <div className={stylesCSS.infoStack}>
                  <div className={stylesCSS.infoItem}>
                    <h1>{this.state.timeRemaining}</h1>
                  </div>
                  <div className={stylesCSS.infoName}>
                    <p>Time Remaining</p>
                  </div>
                </div>
              </div>
              <div className={stylesCSS.submitButton}>
                <button
                  className={`${stylesCSS.button} ${stylesCSS.buttonSubmit}`}
                  onClick={this.submitResponses}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className={stylesCSS.mainContainer}>
              <div className={stylesCSS.questionIndexList}>
                {this.generatelisArr().map((e) => e)}
              </div>
              <div className={stylesCSS.questionContainer}>
                {this.state.questionBank.questions ? (
                  // JSON.stringify(this.state.questionBank.questions[this.state.currentQuestionIndex])
                  <div className={stylesCSS.quesitonResponseCardContainer}>
                    <div className={stylesCSS.quesitonResponseCard}>
                      <h2 className={stylesCSS.colorGrey}>{`Question ${
                        this.state.currentQuestionIndex + 1
                      }`}</h2>
                      <div className={stylesCSS.quesitonResponseCard_question}>
                        <h2>
                          {
                            this.state.questionBank.questions[
                              this.state.currentQuestionIndex
                            ].value
                          }
                        </h2>
                      </div>
                      <div className={stylesCSS.quesitonResponseCard_options}>
                        {this.state.questionBank.questions[
                          this.state.currentQuestionIndex
                        ].options.map((option, i) => {
                          return (
                            <div
                              key={i}
                              className={`${stylesCSS.quesitonResponseCard_option} 
                              ${
                                stylesCSS.option
                              }
                              ${
                                this.isCorrectOption(
                                  this.state.questionBank.questions[
                                    this.state.currentQuestionIndex
                                  ]._id,
                                  option._id
                                )
                                  ? `${stylesCSS.optionChecked}`
                                  : ""
                              }`}
                              onClick={() => {
                                this.recordResponse(
                                  this.state.questionBank.questions[
                                    this.state.currentQuestionIndex
                                  ]._id,
                                  option._id
                                );
                              }}
                            >
                              <p>{option.value}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className={stylesCSS.quesitonResponseCard_buttons}>
                        <button
                          className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons}`}
                          onClick={this.previousButtonHandler}
                        >
                          Previous
                        </button>
                        <button
                          className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons} ${stylesCSS.markButton}`}
                          onClick={() => {
                            this.markHandler(this.state.currentQuestionIndex);
                          }}
                        >
                          {this.state.markedIndexes.indexOf(
                            this.state.currentQuestionIndex
                          ) >= 0
                            ? "UnMark"
                            : "Review Later"}
                        </button>
                        <button
                          className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons}`}
                          onClick={this.nextButtonHandler}
                        >
                          Next
                        </button>
                      </div>
                      <div className={stylesCSS.quesitonResponseCard_buttons_mobile}>
                        <center>
                          <div className="row-6">
                            <button
                              className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons}`}
                              onClick={this.previousButtonHandler}
                            >
                              Previous
                            </button>
                            <button
                              className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons}`}
                              onClick={this.nextButtonHandler}
                            >
                              Next
                            </button>
                          </div>
                          
                          <button
                            className={`${stylesCSS.confirmButton} ${stylesCSS.examControlButtons} ${stylesCSS.markButton}`}
                            onClick={() => {
                              this.markHandler(this.state.currentQuestionIndex);
                            }}
                          >
                            {this.state.markedIndexes.indexOf(
                              this.state.currentQuestionIndex
                            ) >= 0
                              ? "UnMark"
                              : "Review Later"}
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                ) : (
                  "Loading..."
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ExamLive;
