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

class Exams extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
            newExamForm: {
                examName: "",
                startDateTime: new Date(),
                endDateTime: new Date(),
                questionBankId: "",
                classId: "",
            }
        };
        this.fetchData = this.fetchData.bind(this);
        this.addNewExam = this.addNewExam.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
    }

    async fetchData(){

        const response = await fetch(process.env.REACT_APP_API_URI + "/exams/getall",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer ".concat(Cookies.get("jwt"))
            }
        });

        const data = await response.json();

        if(data.message){ //if we dont get exmas from server but got a message
            console.log(data.message);
            alert("Please Login to continue");
            window.location.href = "/login";
            return;
        }

        this.setState((state)=>{
            return {
                examinerId: data._id,
                classes: data.classes,
                questionBanks: data.questionBanks,
                exams: data.exams
            };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    async addNewExam(){

        console.log(moment());

        const newExamName = document.getElementById("newExamName").value;
        const newExamClassId = document.getElementById("newExamClass").value;
        const newExamQuestionBankId = document.getElementById("newExamQuestionBank").value;

        // Converting time to UTC
        const newExamStartDateTime = moment(String(document.getElementById("newExamStartDateTime").value)).toISOString(); 
        const newExamEndDateTime = moment(String(document.getElementById("newExamEndDateTime").value)).toISOString();


        console.log(newExamName);
        console.log(newExamClassId);
        console.log(newExamQuestionBankId);
        console.log(newExamStartDateTime);
        console.log(newExamEndDateTime);

        if(newExamName!=="" && newExamClassId!=="" && newExamQuestionBankId!=="" && newExamStartDateTime !==null && newExamEndDateTime!==null && moment(newExamStartDateTime).isBefore(newExamEndDateTime)){
            const response = await fetch(process.env.REACT_APP_API_URI + "/exams/new",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    newExam: {
                        examName: newExamName,
                        startDateTime: newExamStartDateTime,
                        endDateTime: newExamEndDateTime,
                        questionBankId: newExamQuestionBankId,
                        classId: newExamClassId,
                    }
                })
            });

            const data = await response.json();

            console.log(data);

            await this.fetchData();

            document.getElementById("newExamName").value="";
            document.getElementById("newExamClass").value="";
            document.getElementById("newExamQuestionBank").value="";
            document.getElementById("newExamStartDateTime").value="";
            document.getElementById("newExamEndDateTime").value="";
        }
    }

    async deleteExam(id, examName){
        var confirm = window.confirm(`Confirm to Delete the Exam ${examName} and loose all results.`);

        if(confirm){
            const response = await fetch(process.env.REACT_APP_API_URI + "/exams/del",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    examId: id
                })
            });

            const data = await response.json();

            console.log(data);

            await this.fetchData();
        }
    }

    render(){
        return(
            <div>
                <Navbar current="Exams"/>
                <PageHeader header="Exams"/>
                <SearchBar placeholder="Search for Exam"/>

                <div className={stylesCSS.listBlock}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.exams.map((e,indx)=>{
                        return (
                            <ExamCard key={indx} examinerId={this.state.examinerId} title={e.examName} date={moment(e.startDateTime).local().format('MMMM Do YYYY, h:mm:ss a')} examId={e._id} deleteExam={()=>{ this.deleteExam(e._id, e.examName) }}/>
                            // <div className={stylesCSS.listItem} key={indx}>
                            //     <h2>{e.examName}</h2>
                            //     <button onClick={async ()=> await this.deleteExam(e._id)}>--X--</button>
                            // </div>
                        )
                    })}
                </div>

                <div className={stylesCSS.addNewExamContainer}>
                    <h1>Create new Exam</h1>
                    <div className={stylesCSS.newExamInputContainer}>
                        <div className={stylesCSS.inputRow}>
                            <input type="text" name="" id="newExamName" placeholder="Exam Name"/>
                            <select name="" id="newExamClass">
                                <option value="" disabled selected hidden>Class</option>
                                {this.state.loading?
                                ""
                                : 
                                this.state.classes.map((e, indx)=>{
                                    return (
                                        <option key={indx} value={e._id}>{e.className}</option>
                                    )
                                })}
                            </select>
                            <select name="" id="newExamQuestionBank">
                                <option value="" disabled selected hidden>Question Bank</option>
                                {this.state.loading?
                                ""
                                : 
                                this.state.questionBanks.map((e, indx)=>{
                                    return (
                                        <option key={indx} value={e._id}>{e.questionBankName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={stylesCSS.inputRow}>
                            <input type="datetime-local" id="newExamStartDateTime"/>
                            <div className={stylesCSS.formText}>
                                <p>to</p>
                            </div>
                            <input type="datetime-local" id="newExamEndDateTime"/>
                        </div>
                    </div>
                    <button className={`${stylesCSS.addButton} ${stylesCSS.addQuestion}`} onClick={this.addNewExam}>Create new Exam</button>
                </div>

                <footer className={stylesCSS.footerContainer}>
                    <Footer/>
                </footer>
            </div>
        )
    }
}

export default Exams;