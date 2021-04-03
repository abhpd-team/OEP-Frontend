import React, { Component } from "react";

import stylesCSS from "./styles.module.css";

import Cookies from "js-cookie";

// Importing components

import Navbar from "./../modules/navbar/navbar";
import Footer from "./../modules/footer/footer";
import PageHeader from "./../modules/pageHeader/pageHeader";
import SearchBar from "./../modules/searchBar/searchBar";
import SmallCard from "./../modules/smallCard/smallCard";
import AddNewCard from "./../modules/addNewCard/addNewCard";

class QuestionBanks extends Component{
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
        this.fetchData = this.fetchData.bind(this);
        this.postNewQuestionBank = this.postNewQuestionBank.bind(this);
        this.deleteQuestionBank = this.deleteQuestionBank.bind(this);
    }

    async fetchData(){
        
        const response = await fetch( process.env.REACT_APP_API_URI + "/questionbanks/get",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer ".concat(Cookies.get("jwt"))
            }
        });

        const data = await response.json();

        if(data.message){ //if we dont get questionbanks from server but got a message
            console.log(data.message);
            window.location.href = "/login";
            return;
        }

        this.setState((state)=>{
            return { questionBanks: data };
        });
    }

    async componentDidMount(){
        await this.fetchData();
        if(this.state.questionBanks){
            console.log(this.state.questionBanks);
            this.setState({loading:false});
        }
    }

    async postNewQuestionBank(){
        const newQuestionBankName = document.getElementById("newQuestionBankInput").value;

        document.getElementById("newQuestionBankInput").value = "";

        const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/new",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer ".concat(Cookies.get("jwt"))
            },
            body: JSON.stringify({
                questionBank: {
                    questionBankName: newQuestionBankName
                }
            })
        });

        const data = await response.json();

        console.log(data);

        await this.fetchData();
    }

    async deleteQuestionBank(id, questionBankName){
        
        var confirm = window.confirm("Confirm to Delete the Question Bank: "+ questionBankName);

        if(confirm){
            const response = await fetch(process.env.REACT_APP_API_URI + "/questionbanks/del",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': "Bearer ".concat(Cookies.get("jwt"))
                },
                body: JSON.stringify({
                    questionBankId: id
                })
            });
    
            const data = await response.json();
    
            console.log(data);
    
            await this.fetchData();
        }
    }

    render(){
        return(
            <div>
                <Navbar current="Question Banks"/>
                <PageHeader header="Question Banks"/>
                <SearchBar placeholder="Search for Question Bank"/>
                <div className={stylesCSS.cardContainer}>
                    {this.state.loading?
                    "Loading, please wait ..."
                    : 
                    this.state.questionBanks.map((e,indx)=>{
                        return (
                            <SmallCard key={indx} href={"/questionbanks/"+e._id} header={e.questionBankName} footer={`${e.questions.length} ${(e.questions.length>1)?" questions":" question"}`} deleteHandler={async ()=> await this.deleteQuestionBank(e._id, e.questionBankName)}/>
                        )
                    })}
                </div>
                <div className={stylesCSS.addNewContainer}>
                    <AddNewCard inputId="newQuestionBankInput" placeholder="New Question Bank" onClick={this.postNewQuestionBank}/>
                </div>
                <footer className={stylesCSS.footerContainer}>
                    <Footer/>
                </footer>
            </div>
        )
    }
}

export default QuestionBanks;