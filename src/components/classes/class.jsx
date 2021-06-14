import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";
import xlsx from "xlsx";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import HeaderBar from "./../modules/headerBar/headerBar";

class Class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.fetchData = this.fetchData.bind(this);
    this.postNewCandidate = this.postNewCandidate.bind(this);
    this.delCandidate = this.delCandidate.bind(this);
    this.accordianHeaderColor = this.accordianHeaderColor.bind(this);
    this.inputExcel = this.inputExcel.bind(this);
  }
  async fetchData() {
    const response = await fetch(
      process.env.REACT_APP_API_URI + "/classes/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer ".concat(Cookies.get("jwt")),
        },
      }
    );

    const data = await response.json();

    const classId = this.props.match.params.classId;

    function findClass() {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element._id === classId) {
          return element;
        }
      }
    }

    const foundClass = findClass();

    this.setState((state) => {
      return { class: foundClass };
    });
  }

  async componentDidMount() {
    await this.fetchData();
    if (this.state.class) {
      this.setState({ loading: false });
    } else {
      console.log("Invalid Request/Invalid token");
    }
  }

  async postNewCandidate() {
    const newCandidateId = document.getElementById("newCandidateId").value;
    const newCandidateName = document.getElementById("newCandidateName").value;
    const newCandidateEmail =
      document.getElementById("newCandidateEmail").value;

    this.setState(
      (state) => {
        const newState = JSON.parse(JSON.stringify(state));

        let duplicate = false;

        newState.class.candidates.forEach((ele) => {
          if (
            newCandidateId === ele.candidateId ||
            newCandidateEmail === ele.candidateEmail
          ) {
            duplicate = true;
          }
        });
        if (
          newCandidateId.trim() === "" ||
          newCandidateEmail.trim() === "" ||
          newCandidateEmail.trim() === ""
        ) {
          alert("Please provide valid non-empty inputs");
          return newState;
        }
        if (duplicate) {
          alert("Please enter unique Candidate Id and Email");
        }
        if (
          !duplicate &&
          newCandidateId !== "" &&
          newCandidateName !== "" &&
          newCandidateEmail !== ""
        ) {
          newState.class.candidates.push({
            candidateId: newCandidateId.trim(),
            candidateName: newCandidateName.trim(),
            candidateEmail: newCandidateEmail.trim(),
          });
          document.getElementById("newCandidateId").value = "";
          document.getElementById("newCandidateName").value = "";
          document.getElementById("newCandidateEmail").value = "";
        }
        return newState;
      },
      async () => {
        console.log(this.state.class);

        const response = await fetch(
          process.env.REACT_APP_API_URI + "/classes/upd",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer ".concat(Cookies.get("jwt")),
            },
            body: JSON.stringify({
              updatedClass: this.state.class,
            }),
          }
        );

        const data = await response.json();

        console.log(data);

        await this.fetchData();
      }
    );
  }

  async delCandidate(id) {
    this.setState(
      (state) => {
        const newState = JSON.parse(JSON.stringify(state));
        const getIndx = () => {
          for (
            let index = 0;
            index < newState.class.candidates.length;
            index++
          ) {
            const element = newState.class.candidates[index];
            if (element._id === id) {
              return index;
            }
          }
          return -1;
        };

        const indx = getIndx();

        console.log(indx);

        if (indx > -1) {
          newState.class.candidates.splice(indx, 1);
        }

        return newState;
      },
      async () => {
        console.log(this.state.class.candidates);

        const response = await fetch(
          process.env.REACT_APP_API_URI + "/classes/upd",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer ".concat(Cookies.get("jwt")),
            },
            body: JSON.stringify({
              updatedClass: this.state.class,
            }),
          }
        );

        const data = await response.json();

        console.log(data);

        await this.fetchData();
      }
    );
  }

  accordianHeaderColor(event) {
    const id = event.target.innerHTML;

    const cardHeaders = document.getElementsByClassName("card-header");
    for (let i = 0; i < cardHeaders.length; i++) {
      if (cardHeaders[i].id === "heading" + id) {
        cardHeaders[i].style.backgroundColor = "#FFE600";
      } else {
        cardHeaders[i].style.backgroundColor = "#fff";
      }
    }
  }

  //Importing xlsx to json
  inputExcel(event) {
    console.log(event.target.files[0]);
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(event.target.files[0]);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = xlsx.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );

        if (!rowObject[0].id && !rowObject[0].name && !rowObject[0].email) {
          console.log("invalid file format");
          return;
        }

        this.setState(
          (state) => {
            const newState = JSON.parse(JSON.stringify(state));

            rowObject.forEach((ele) => {
              var duplicate = false;

              newState.class.candidates.forEach((cand) => {
                if (String(ele.id) === cand.candidateId) {
                  duplicate = true;
                }
              });

              if (
                !duplicate &&
                String(ele.id) !== "" &&
                ele.name !== "" &&
                ele.email !== ""
              ) {
                newState.class.candidates.push({
                  candidateId: String(ele.id),
                  candidateName: ele.name,
                  candidateEmail: ele.email,
                });
              }
            });

            return newState;
          },
          async () => {
            console.log(this.state.class);

            const response = await fetch(
              process.env.REACT_APP_API_URI + "/classes/upd",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: "Bearer ".concat(Cookies.get("jwt")),
                },
                body: JSON.stringify({
                  updatedClass: this.state.class,
                }),
              }
            );

            const data = await response.json();

            console.log(data);

            await this.fetchData();
          }
        );
      });
    };
  }

  render() {
    return (
      <div>
        <Navbar current="Classes" />
        {this.state.loading ? (
          <center>Loading..Please Wait.</center>
        ) : (
          <div>
            <div>
              <HeaderBar
                header={this.state.class.className}
                sideHeader={`${this.state.class.candidates.length} ${
                  this.state.class.candidates.length > 1
                    ? " candidates"
                    : " candidate"
                }`}
                backHref="/classes"
              />
              <div className={stylesCSS.classDetails}>
                <div className={stylesCSS.listBlock}>
                  <table className={stylesCSS.table}>
                    <thead>
                      <tr className={stylesCSS.tableRow}>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col" width="100px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.class.candidates.map((e, indx) => {
                        return (
                          <tr
                            key={indx}
                            className={`${stylesCSS.tableRow} ${stylesCSS.tableEntry}`}
                          >
                            <td className={stylesCSS.td}>{e.candidateId}</td>
                            <td className={stylesCSS.td}>{e.candidateName}</td>
                            <td className={stylesCSS.td}>{e.candidateEmail}</td>
                            <td className={stylesCSS.td}>
                              <div
                                className={stylesCSS.deleteButton}
                                onClick={() => this.delCandidate(e._id)}
                              >
                                delete
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div
                    className={"text-center my-5 " + stylesCSS.sideHeaderMobile}
                  >{`${this.state.class.candidates.length} ${
                    this.state.class.candidates.length > 1
                      ? " candidates"
                      : " candidate"
                  }`}</div>
                  <div className={stylesCSS.accordianToggle}>
                    <div>
                      <div className="accordion" id="accordionExample">
                        {this.state.class.candidates.map((e) => {
                          return (
                            <div key={e.candidateId}>
                              <div
                                className={
                                  "card my-1 " + stylesCSS.accordianCard
                                }
                              >
                                <div
                                  className={
                                    "card-header text-center py-1 " +
                                    stylesCSS.accordianHeader
                                  }
                                  id={"heading" + e.candidateId}
                                >
                                  <h2 className="mb-0">
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
                                          <strong>Name: </strong>
                                        </span>
                                        <span> {e.candidateName}</span>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col d-flex justify-content-between">
                                        <span>
                                          <strong>Email: </strong>
                                        </span>
                                        <span> {e.candidateEmail}</span>
                                      </div>
                                    </div>
                                    <div className="row ">
                                      <div className="col text-center text-danger">
                                        <div
                                          className={stylesCSS.deleteButton}
                                          onClick={() =>
                                            this.delCandidate(e._id)
                                          }
                                        >
                                          Delete
                                        </div>
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
              <div className="container">
                <div className="row">
                  <div className="col text-center font-weight-bolder h4 pt-3">
                    Add a New Candidate
                  </div>
                </div>
                <div className={"row " + stylesCSS.addCandidate}>
                  <div className="col-md-4 text-center d-flex px-1">
                    <input
                      className={stylesCSS.input}
                      placeholder="Unique Id"
                      id="newCandidateId"
                      type="text"
                    />
                  </div>
                  <div className="col-md-4 text-center  d-flex px-1">
                    <input
                      className={stylesCSS.input}
                      placeholder="Full Name"
                      id="newCandidateName"
                      type="text"
                    />
                  </div>
                  <div className="col-md-4 text-center  d-flex px-1">
                    <input
                      className={stylesCSS.input}
                      placeholder="Email"
                      id="newCandidateEmail"
                      type="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center ">
                    <button
                      className={stylesCSS.addButton}
                      onClick={this.postNewCandidate}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className=" row text-center pt-5  ">
                  <div className="col">
                    <div className="row">
                      <div className="col font-weight-bolder h4 ">
                        Or Select a Spreadsheet
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        Make sure you have the first row with column names as
                        "id","name" and "email"
                      </div>
                    </div>
                    <div className="row">
                      <div className="col pl-5">
                        <input
                          type="file"
                          id="input-excel"
                          accept=".xls,.xlsx"
                          onChange={this.inputExcel}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <footer className={stylesCSS.footerContainer}>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Class;
