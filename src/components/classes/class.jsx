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
        
        const response = await fetch("http://localhost:5000/classes/get",{
            method: "POST",
            body: {
                username: "abhishek",
                password: "abhishek"
            }
        });

        const data = await response.json();


        const classId = this.props.match.params.classId;

        console.log(classId);

        function findClass () {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if(element._id===classId){
                    console.log("found");
                    console.log(element);
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
        this.setState({loading:false});
    }

    render(){
        return(
            <div>
                {this.state.loading?
                "Loading..Please Wait."
                :
                <div>
                    <h1 className="classesHeading">{this.state.class.className}</h1>
                    <div className="listBlock">
                        {this.state.class.candidates.map((e,indx)=>{
                            return (
                                <div className="listItem" key={indx}>
                                    <h2>{e.candidateId}</h2>
                                    <h2>{e.candidateName}</h2>
                                    <h2>{e.candidateEmail}</h2>
                                </div>
                            )
                        })}
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