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

        this.setState((state)=>{
            return { classes: data };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        this.setState({loading:false});
    }

    render(){
        return(
            <div>
                <h1 className="classesHeading">Classes</h1>
                <div className="listBlock">
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.classes.map((e,indx)=>{
                        return (
                            <div className="listItem" key={indx}>
                                <h2>{e.className}</h2>
                                <a href={"/classes/"+e._id}><button><h4>Edit</h4></button></a>
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