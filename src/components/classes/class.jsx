import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";
import xlsx from "xlsx";

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
            newState.class.candidates.push({
                candidateId: newCandidateId,
                candidateName: newCandidateName,
                candidateEmail: newCandidateEmail
            })
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
                        newState.class.candidates.push({
                            candidateId: ele.id,
                            candidateName: ele.name,
                            candidateEmail: ele.email
                        });
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
                "Loading..Please Wait."
                :
                <div>
                    <h1 className={stylesCSS.classesHeading}>{this.state.class.className}</h1>
                    <div className={stylesCSS.listBlock}>
                        {this.state.class.candidates.map((e,indx)=>{
                            return (
                                <div className={stylesCSS.listItem} key={indx}>
                                    <h2>{e.candidateId}</h2>
                                    <h2>{e.candidateName}</h2>
                                    <h2>{e.candidateEmail}</h2>
                                    <button onClick={()=>this.delCandidate(e._id)}>--X--</button>
                                </div>
                            )
                        })}
                        <div className={`${stylesCSS.newlistItem} ${stylesCSS.translucent}`}>
                            <input id="newCandidateId" type="text"/>
                            <input id="newCandidateName" type="text"/>
                            <input id="newCandidateEmail" type="text"/>
                            <button onClick={this.postNewCandidate}>Add new Candidate</button>
                        </div>
                        <p>Make sure you have the first row with column names as "id","name" and "email" </p>
                        <div>
                            <input type="file" id="input-excel" accept=".xls,.xlsx" onChange = {this.inputExcel} />
                        </div>
                    </div>
                </div>
                }

                {/* <div>
                    <button onClick={}> New Exam </button>
                </div> */}
            </div>
        )
    }
}

export default Classes;