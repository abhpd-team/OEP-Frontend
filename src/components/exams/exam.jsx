import React, { Component } from "react";
import moment from "moment";

import stylesCSS from "./styles.module.css";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import HeaderBar from "./../modules/headerBar/headerBar";

import Cookies from "js-cookie";

class Exams extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
        this.appearedCount = this.appearedCount.bind(this);
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
            window.location.href = "/login";
            return;
        }

        const examId = this.props.match.params.examId;

        function findExam () {
            for (let index = 0; index < data.exams.length; index++) {
                const element = data.exams[index];
                if(element._id===examId){
                    return element;
                }
            }
        }

        const foundExam = findExam();

        this.setState((state)=>{
            return {
                examinerId: data._id,
                exam: foundExam,
                questionBanks: data.questionBanks,
                // classes: data.classes,
            };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    appearedCount = ()=>{
        var count = 0;
        for (let i = 0; i < this.state.exam.candidates.length; i++) {
            const element = this.state.exam.candidates[i];
            if(element.hasAppeared){
                count++;
            }
        }
        return count;
    }

    copyTextFromCardLinkURL(event){
        var tempInput = document.createElement("input");
        tempInput.value = document.getElementById(event.target.dataset.examid).innerHTML;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        alert("Text Copied: " + tempInput.value);
        document.body.removeChild(tempInput);
    }

    render(){
        return(
            <div>
                <Navbar current="Exams"/>
                <div className={stylesCSS.listBlock}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    <div className={stylesCSS.examDetails}>
                        <HeaderBar backHref="/exams" header={this.state.exam.examName} sideHeader={`${this.appearedCount()} of ${this.state.exam.candidates.length} Appeared`}/>
                        
                        <div className={stylesCSS.cardLinkRow}>
                            <div className={stylesCSS.cardLink}><p className={stylesCSS.cardLinkURLclass} id={this.state.exam._id}>{`https://dev-oep.herokuapp.com/examlive/${this.state.examinerId}/${this.state.exam._id}`}</p></div>
                            <div className={stylesCSS.cardLinkCopy} onClick={this.copyTextFromCardLinkURL}><p data-examid={this.state.exam._id}>Copy</p></div>
                        </div>

                        <div className={stylesCSS.examDetailsCard}>
                            <div className={stylesCSS.examDetailsTextContainer}>
                                <table className={stylesCSS.detailsCardTable}>
                                    <tbody>
                                        <tr className={stylesCSS.detailsCardTableRow}>
                                            <td>Question Bank</td>
                                            <td>{this.state.questionBanks.find(ele=> ele._id===this.state.exam.questionBankId).questionBankName}</td>
                                        </tr>
                                        <tr className={stylesCSS.detailsCardTableRow}>
                                            <td>Start Date & Time</td>
                                            <td>{moment(this.state.exam.startDateTime).local().format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>
                                        <tr className={stylesCSS.detailsCardTableRow}>
                                            <td>End Date & Time</td>
                                            <td>{moment(this.state.exam.endDateTime).local().format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={stylesCSS.tableHeader}>
                            <h1>Candidate details & Result</h1>
                        </div>
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
                                {this.state.exam.candidates.map((e,indx)=>{
                                    return (
                                        <tr key={indx} className={`${stylesCSS.tableRow} ${stylesCSS.tableEntry}`}>
                                            <td className={stylesCSS.td}>{e.candidateId}</td>
                                            <td className={stylesCSS.td}>{e.candidatePassword}</td>
                                            <td className={stylesCSS.td}>{e.candidateName}</td>
                                            <td className={`${stylesCSS.td} ${(e.hasAppeared)?stylesCSS.greenTd:stylesCSS.redTd}`}>{(e.hasAppeared)?"YES":"NO"}</td>
                                            <td className={stylesCSS.td}>{`${e.Marks}/${this.state.exam.totalMarks}`}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
                <div className={stylesCSS.footerContainer}>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Exams;