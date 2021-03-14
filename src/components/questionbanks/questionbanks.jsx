import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";

class Classes extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
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
                <h1 className={stylesCSS.classesHeading}>Question Banks</h1>
                <div className={stylesCSS.listBlock}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.questionbanks.map((e,indx)=>{
                        return (
                            <div className={stylesCSS.listItem} key={indx}>
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