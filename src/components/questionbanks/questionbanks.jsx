import React, { Component } from "react";

import "./styles.css";

class Classes extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(){
        
        const response = await fetch("http://oep-api.herokuapp.com/questionbanks/get",{
            method: "POST",
            body: {
                username: "abhishek",
                password: "abhishek"
            }
        });

        const data = await response.json();

        this.setState((state)=>{
            return { questionbanks: data };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    render(){
        return(
            <div>
                <h1 className="classesHeading">Question Banks</h1>
                <div className="listBlock">
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.questionbanks.map((e,indx)=>{
                        return (
                            <div className="listItem" key={indx}>
                                <h2>{e.questionBankName}</h2>
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

export default Classes;