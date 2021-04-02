import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";
import xlsx from "xlsx";

// Importing components

import HeaderBar from "./../modules/headerBar/headerBar";

class Classes extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
        this.postNewCandidate = this.postNewCandidate.bind(this);
        this.delCandidate = this.delCandidate.bind(this);

        this.inputExcel = this.inputExcel.bind(this);
    }

    async fetchData(){
        
        const response = await fetch(process.env.REACT_APP_API_URI + "/classes/get",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer ".concat(Cookies.get("jwt"))
            }
        });

        const data = await response.json();

        const classId = this.props.match.params.classId;

        function findClass () {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if(element._id===classId){
                    return element;
                }
            }
        }

        const foundClass = findClass();

        this.setState((state)=>{
            return { class: foundClass };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        if(this.state.class){
            this.setState({loading:false});
        } else{
            console.log("Invalid Request/Invalid token");
        }
    }

    async postNewCandidate(){
        const newCandidateId = document.getElementById("newCandidateId").value;
        const newCandidateName = document.getElementById("newCandidateName").value;
        const newCandidateEmail = document.getElementById("newCandidateEmail").value;

        document.getElementById("newCandidateId").value="";
        document.getElementById("newCandidateName").value="";
        document.getElementById("newCandidateEmail").value="";

        console.log(newCandidateId);
        console.log(newCandidateName);
        console.log(newCandidateEmail);

        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));

            var duplicate = false;

            newState.class.candidates.forEach(ele=> {
                if(newCandidateId === ele.candidateId){
                    duplicate = true;
                }
            })
            if(!duplicate && newCandidateId !=="" && newCandidateName!=="" && newCandidateEmail!==""){
                newState.class.candidates.push({
                    candidateId: newCandidateId,
                    candidateName: newCandidateName,
                    candidateEmail: newCandidateEmail
                })
            }
            return newState;
        },async ()=>{
            console.log(this.state.class);

            const response = await fetch(process.env.REACT_APP_API_URI + "/classes/upd",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    updatedClass: this.state.class
                })
            });

            const data = await response.json();

            console.log(data);

            await this.fetchData();
        });
    }

    async delCandidate(id){
        this.setState((state)=>{
            const newState = JSON.parse(JSON.stringify(state));
            const getIndx = () => {
                for (let index = 0; index < newState.class.candidates.length; index++) {
                    const element = newState.class.candidates[index];
                    if(element._id===id){
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
        },async ()=>{
            console.log(this.state.class.candidates);

            const response = await fetch(process.env.REACT_APP_API_URI + "/classes/upd",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    updatedClass: this.state.class
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

                if(!rowObject[0].id && !rowObject[0].name && !rowObject[0].email){
                    console.log("invalid file format");
                    return;
                }

                this.setState((state)=>{
                    const newState = JSON.parse(JSON.stringify(state));
                    
                    rowObject.forEach( ele => {

                        var duplicate = false;

                        newState.class.candidates.forEach(cand => {
                            if(String(ele.id) === cand.candidateId){
                                duplicate = true;
                            }
                        })
                        
                        if(!duplicate && String(ele.id)!=="" && ele.name!=="" && ele.email!=="" ){
                            newState.class.candidates.push({
                                candidateId: String(ele.id),
                                candidateName: ele.name,
                                candidateEmail: ele.email
                            });
                        }
                    });
                    
                    return newState;
                },async ()=>{
                    console.log(this.state.class);
        
                    const response = await fetch(process.env.REACT_APP_API_URI + "/classes/upd",{
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': "Bearer ".concat(Cookies.get("jwt"))
                        },
                        body: JSON.stringify({
                            updatedClass: this.state.class
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
                {this.state.loading?
                <center>Loading..Please Wait.</center>
                :
                <div>
                    <div className={stylesCSS.classDetails}>
                        <HeaderBar header={this.state.class.className} sideHeader={`${this.state.class.candidates.length} ${(this.state.class.candidates.length>1)?" candidates":" candidate"}`} backHref="/classes"/>
                        <div className={stylesCSS.listBlock}>
                            <table className={stylesCSS.table}>
                                <thead>
                                    <tr className={stylesCSS.tableRow}>
                                        <th scope="col" width='40px'></th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" width='100px'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.class.candidates.map((e,indx)=>{
                                        return (
                                            <tr key={indx} className={`${stylesCSS.tableRow} ${stylesCSS.tableEntry}`}>
                                                <td></td>
                                                <td>{e.candidateId}</td>
                                                <td>{e.candidateName}</td>
                                                <td>{e.candidateEmail}</td>
                                                <td><div className={stylesCSS.deleteButton} onClick={()=>this.delCandidate(e._id)}><p>delete</p></div></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className={stylesCSS.addNewCandidateSection}>
                                <div>
                                    <h2>Add New Candidate</h2>
                                    <div>
                                        <center>
                                            <div className={stylesCSS.addNewCandidateCard}>
                                                <input className={stylesCSS.input} id="newCandidateId" type="text"/>
                                                <input className={stylesCSS.input} id="newCandidateName" type="text"/>
                                                <input className={stylesCSS.input} id="newCandidateEmail" type="text"/>
                                                <button className={stylesCSS.addButton} onClick={this.postNewCandidate}>Add</button>
                                            </div>
                                        </center>
                                    </div>
                                </div>
                                <div>
                                    <h2>Or Select a Spreadsheet</h2>
                                    <p>Make sure you have the first row with column names as "id","name" and "email" </p>
                                    <div>
                                        <input type="file" id="input-excel" accept=".xls,.xlsx" onChange = {this.inputExcel} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default Classes;