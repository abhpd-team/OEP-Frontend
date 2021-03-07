import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

class Classes extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
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

    render(){
        return(
            <div>
                <h1 className={stylesCSS.classesHeading}>Classes</h1>
                <div className={stylesCSS.listBlock}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.classes.map((e,indx)=>{
                        // if(e===null){
                        //     return <div></div>;
                        // }
                        return (
                            <div className={stylesCSS.listItem} key={indx}>
                                <h2>{e.className}</h2>
                                <a href={"/classes/"+e._id}><button><h4>Edit</h4></button></a>
                                <button onClick={async ()=> await this.deleteClass(e._id)}><h4>--X--</h4></button>
                            </div>
                        )
                    })}
                    <div className={`${stylesCSS.newlistItem} ${stylesCSS.translucent}`}>
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