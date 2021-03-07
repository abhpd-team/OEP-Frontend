import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

class Exams extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
    }

    async fetchData(){
        
        const response = await fetch("http://oep-api.herokuapp.com/exams/get",{
            method: "POST",
            body: {
                username: "abhishek",
                password: "abhishek"
            }
        });

        const data = await response.json();

        this.setState((state)=>{
            return { exams: data };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    async deleteExam(id){
        const response = await fetch("http://oep-api.herokuapp.com/exams/del",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "abhishek",
                password: "abhishek",
                examId: id
            })
        });

        const data = await response.json();

        console.log(data);

        await this.fetchData();
    }

    render(){
        return(
            <div>
                <h1 className={stylesCSS.examHeading}>Exams</h1>
                <div className={stylesCSS.listBlock}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.exams.map((e,indx)=>{
                        return (
                            <div className={stylesCSS.listItem} key={indx}>
                                <h2>{e.examName}</h2>
                                <button onClick={async ()=> await this.deleteExam(e._id)}>--X--</button>
                            </div>
                        )
                    })}
                </div>

                {/* <div>
                    <button onClick={}> New Exam </button>
                </div> */}
            </div>
        )
    }
}

export default Exams;