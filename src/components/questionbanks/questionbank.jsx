import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";
import xlsx from "xlsx";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import HeaderBar from "./../modules/headerBar/headerBar";

class QuestionBank extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
            newQuestion:{
                marks: 1,
                value: "",
                options: [
                    "",
                ],
                correctOptionIndx: 0
            }
        };

        this.fetchData = this.fetchData.bind(this);

        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.changeNewQuestionCorrectOptionIndx = this.changeNewQuestionCorrectOptionIndx.bind(this);
        this.newQuestionStateUpdate = this.newQuestionStateUpdate.bind(this);

        this.postNewQuestion = this.postNewQuestion.bind(this);
        this.delQuestion = this.delQuestion.bind(this);

        this.inputExcel = this.inputExcel.bind(this);
    }

    async fetchData(){
        
        const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/get",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer ".concat(Cookies.get("jwt"))
            }
        });

        const data = await response.json();

        const questionBankId = this.props.match.params.questionBankId;

        function findQuestionBank () {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if(element._id===questionBankId){
                    return element;
                }
            }
        }

        const foundQuestionBank = findQuestionBank();

        this.setState((state)=>{
            return { questionBank: foundQuestionBank };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        if(this.state.questionBank){
            this.setState({loading:false});
        } else{
            console.log("Invalid Request/Invalid token");
        }
    }

    async addOption(){
        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            newState.newQuestion.options.push("");
            return newState;
        });
    }

    async removeOption(){
        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            newState.newQuestion.options.pop();
            return newState;
        });
    }

    async changeNewQuestionCorrectOptionIndx(event){
        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            newState.newQuestion.correctOptionIndx = Number(event.target.id)
            return newState;
        });
    }

    async newQuestionStateUpdate(event){
        var newQuestion = document.getElementById("newQuestion").value;
        var newOptions = Array.from(document.getElementsByClassName("newOption")).map(ele => ele.value);

        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            
            newState.newQuestion = {
                value: newQuestion,
                marks: 1,
                options: newOptions,
                correctOptionIndx: state.newQuestion.correctOptionIndx
            }

            return newState;
        });
    }

    async postNewQuestion(){

        const newOptions = this.state.newQuestion.options.map(e=>({ value:e }));
        const newCorrectOptionValue = this.state.newQuestion.options[this.state.newQuestion.correctOptionIndx];

        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));

            var duplicate = false;

            newState.questionBank.questions.forEach(ele=> {
                if( this.state.newQuestion.value === ele.value){
                    duplicate = true;
                }
            })
            if(!duplicate && this.state.newQuestion.value !=="" && newOptions[0].value!=="" && newCorrectOptionValue!=="" && this.state.newQuestion.marks>=0 ){
                newState.questionBank.questions.push({
                    marks: this.state.newQuestion.marks,
                    value: this.state.newQuestion.value,
                    options: newOptions,
                    correctOptionValue: newCorrectOptionValue,
                })
            }
            return newState;

        }, async ()=>{
            console.log(this.state.questionBank);

            const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/upd",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    updatedQuestionBank: this.state.questionBank
                })
            });

            const data = await response.json();

            console.log(data);

            await this.fetchData();
        });
    }

    async delQuestion(id){
        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            const getIndx = () => {
                for (let index = 0; index < newState.questionBank.questions.length; index++) {
                    const element = newState.questionBank.questions[index];
                    if(element._id===id){
                        return index;
                    }
                }
                return -1;
            };

            const indx = getIndx();

            console.log(indx);

            if (indx > -1) {
                newState.questionBank.questions.splice(indx, 1);
            }

            return newState;

        }, async ()=>{
            console.log(this.state.questionBank.questions);

            const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/upd",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    updatedQuestionBank: this.state.questionBank
                })
            });

            const data = await response.json();

            console.log(data);

            await this.fetchData();
        });
    }

    //Importing xlsx to json
    inputExcel(event){
        console.log(event.target.files[0]);
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(event.target.files[0]);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = xlsx.read(data,{type:"binary"});
            workbook.SheetNames.forEach(sheet => {
                let rowObject = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                if(!rowObject[0].question && !rowObject[0].marks && !rowObject[0].correct){
                    console.log("invalid file format");
                    return;
                }

                console.log(rowObject);

                this.setState((state)=>{
                    const newState = JSON.parse(JSON.stringify(state));
                    
                    rowObject.forEach( ele => {

                        var newQuestion = "";
                        var newMarks = 1;
                        var newCorrectOptionValue = "";
                        var newOptions = [];

                        for (const [key, value] of Object.entries(ele)) {
                            if(key.split('_')[0]==="option"){
                                newOptions.push({
                                    value: value
                                });
                                continue;
                            }
        
                            switch(key){
                                case "question":
                                    newQuestion = value;
                                break;
        
                                case "marks":
                                    newMarks = 1;
                                break;
        
                                case "correct":
                                    newCorrectOptionValue = value;
                                break;
                    
                                default:
                                    console.log("Invalid Input");
                                break;
                            }
                        }
        
                        // console.log(newQuestion);
                        // console.log(newMarks);
                        // console.log(newCorrectOptionValue);
                        // console.log(newOptions);

                        var duplicate = false;

                        newState.questionBank.questions.forEach(ele=> {
                            if( newQuestion === ele.value){
                                duplicate = true;
                            }
                        })

                        var isValidOptionCorrect = (newOptions.find(option=> option.value===newCorrectOptionValue)!==undefined)?true:false;

                        if(isValidOptionCorrect && !duplicate && newQuestion !=="" && newOptions[0].value!=="" && newCorrectOptionValue!=="" && newMarks>=0 ){
                            console.log("Updated new state");
                            newState.questionBank.questions.push({
                                marks: newMarks,
                                value: newQuestion,
                                options: newOptions,
                                correctOptionValue: newCorrectOptionValue,
                            })
                        }
                    });
                    
                    return newState;

                }, async ()=>{
                    console.log(this.state.questionBank.questions);

                    const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/upd",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': "Bearer ".concat(Cookies.get("jwt"))
                        },
                        body: JSON.stringify({
                            updatedQuestionBank: this.state.questionBank
                        })
                    });

                    const data = await response.json();

                    console.log(data);

                    await this.fetchData();
                });
            });
        }
    }


    render(){
        return(
            <div>
                <Navbar current="Question Banks"/>
                {this.state.loading?
                <center>Loading..Please Wait.</center>
                :
                <div>
                    <div className={stylesCSS.questionBankDetails}>
                        <HeaderBar 
                            header={this.state.questionBank.questionBankName} 
                            sideHeader={`${this.state.questionBank.questions.length} ${(this.state.questionBank.questions.length>1)?" questions":" question"}`} 
                            backHref="/questionbanks"
                        />
                        <div className={stylesCSS.listBlock}>
                            <table className={stylesCSS.table}>
                                <thead>
                                    <tr className={stylesCSS.tableRow}>
                                        <th>No</th>
                                        <th>Question</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.questionBank.questions.map((e,indx)=>{
                                        return (
                                            <tr key={indx} className={`${stylesCSS.tableRow} ${stylesCSS.tableEntry}`}>
                                                <td className={stylesCSS.td}>
                                                    <div className={stylesCSS.customColumn}>
                                                        <div>{indx+1}</div>
                                                        <div className={stylesCSS.deleteButton} onClick={()=>this.delQuestion(e._id)}><p>delete</p></div>
                                                    </div>
                                                </td>
                                                <td className={`${stylesCSS.td} ${stylesCSS.questionTD}`}>{e.value}</td>
                                                <td className={stylesCSS.td}>
                                                    <table className={stylesCSS.table}>
                                                        <tbody>
                                                            {e.options.map((option, i)=>{
                                                                return (
                                                                    <tr key={i}><td className={`${stylesCSS.td} ${stylesCSS.optionsTD} ${(option.value===e.correctOptionValue)?`${stylesCSS.correctOptionTD}`:""}`}>{option.value}</td></tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className={stylesCSS.addNewQuestionSection}>
                                <div>
                                    <h2>Add New Question</h2>
                                    <div>
                                        <div className={stylesCSS.addNewQuestionCard}>
                                            <div className={stylesCSS.addNewQuestionCardRow}>
                                                <input onChange={this.newQuestionStateUpdate} placeholder="Question" className={`${stylesCSS.input} ${stylesCSS.questioninput}`} id="newQuestion" type="text"/>
                                            </div>
                                            {
                                                this.state.newQuestion.options.map((option, indx)=>{
                                                    return (
                                                        <div key={indx} className={stylesCSS.addNewQuestionCardRow}>
                                                            <div className={stylesCSS.addNewText}>
                                                                <i onClick={this.changeNewQuestionCorrectOptionIndx} id={indx} className={`fas fa-check-square fa-2x ${stylesCSS.checkMark} ${(indx===this.state.newQuestion.correctOptionIndx)?`${stylesCSS.checkMarkChecked}`:""}`}></i>
                                                            </div>
                                                            <div className={stylesCSS.addNewText}>
                                                                <h2>{indx+1}</h2>
                                                            </div>
                                                            <input value={option} onChange={this.newQuestionStateUpdate} placeholder="Option" className={`newOption ${stylesCSS.input} ${stylesCSS.optionsinput}`} type="text"/>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className={stylesCSS.addNewOptionCardButtonRow}>
                                                <button className={`${stylesCSS.addButton} ${stylesCSS.removeOption}`} onClick={this.removeOption}>Remove Last Option</button>
                                                <button className={`${stylesCSS.addButton} ${stylesCSS.addOption}`} onClick={this.addOption}>Add Option</button>
                                            </div>
                                            <div className={stylesCSS.addNewQuestionCardButtonRow}>
                                                <button className={stylesCSS.addButton} onClick={this.postNewQuestion}>Add Question</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2>Or Select a Spreadsheet</h2>
                                    <p>Make sure you have first row with these column name: <br/>
                                        “question”, “option_1”, ”option_2”, ”option_3”, ... , ”correct”.<br/>
                                        correct column should have a value identical to one of the option 
                                    </p>
                                    <div>
                                        <input type="file" id="input-excel" accept=".xls,.xlsx" onChange = {this.inputExcel} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <footer className={stylesCSS.footerContainer}>
                    <Footer/>
                </footer>
            </div>
        )
    }
}

export default QuestionBank;