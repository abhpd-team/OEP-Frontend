import React, { Component } from "react";
import "./styles.css";
import  XLSX from "xlsx";

class Classes extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
            optedFile: ""
        };
        this.inputExcel= this.inputExcel.bind(this);
        this.exceltojson=this.exceltojson.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.postNewClass = this.postNewClass.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
    }

    async fetchData(){
        
        const response = await fetch("http://oep-api.herokuapp.com/classes/get",{
            method: "POST",
            body: {
                username: "abhishek",
                password: "abhishek"
            }
        });

        const data = await response.json();

        this.setState((state)=>{
            return { classes: data };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    async postNewClass(){
        const newClassName = document.getElementById("newClassInput").value;

        document.getElementById("newClassInput").value = "";

        const response = await fetch("http://oep-api.herokuapp.com/classes/new",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "abhishek",
                password: "abhishek",
                class: {
                    className: newClassName
                }
            })
        });

        const data = await response.json();

        console.log(data);

        await this.fetchData();
    }

    async deleteClass(id){
        const response = await fetch("http://oep-api.herokuapp.com/classes/del",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "abhishek",
                password: "abhishek",
                classId: id
            })
        });

        const data = await response.json();

        console.log(data);

        await this.fetchData();
    }

    inputExcel (event) {
        this.setState({
            optedFile: event.target.files[0]
        })
        
    }

    async exceltojson(){
        let data=[{     
          "name":"Abhishek", 
          "data":"scd",
          "abc":"sdef" 
          }]
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if(this.state.optedFile){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(this.state.optedFile);
            fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
            });
            }
        }
    } 

    render(){
        return(
            <div>
<h1 className="classesHeading">Classes</h1>
<div className="conatiner mt-5">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
                <p align="right">
                <input className="form-control" type="file" id="input-excel" accept=".xls,.xlsx" onChange = {this.inputExcel} />
                </p>
            </div>
            <div className="col-md-2">
            <p align="right">
                <button className="btn btn-primary" id="convert-button" onClick={this.exceltojson}>Convert</button>
            </p>
            </div>
<div className="col-md-12">
    <pre id="jsondata"></pre>
</div>
        </div>
    </div>
        
                
                <div className="listBlock">
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.classes.map((e,indx)=>{
                        // if(e===null){
                        //     return <div></div>;
                        // }
                        return (
                            <div className="listItem" key={indx}>
                                <h2>{e.className}</h2>
                                <a href={"/classes/"+e._id}><button><h4>Edit</h4></button></a>
                                <button onClick={async ()=> await this.deleteClass(e._id)}><h4>--X--</h4></button>
                            </div>
                        )
                    })}
                    <div className="newlistItem translucent">
                        <input id="newClassInput" type="text"/>
                        <button onClick={this.postNewClass}>Create new Class</button>
                    </div>
                </div>

                {/* <div>
                    <button onClick={}> New Exam </button>
                </div> */}
            </div>
        )
    }
}

export default Classes;