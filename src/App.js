import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importing Components
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Classes from "./components/classes/classes";
import Class from "./components/classes/class";
import Exams from "./components/exams/exams";
import Exam from "./components/exams/exam";
import QuestionBanks from "./components/questionbanks/questionbanks";
import QuestionBank from "./components/questionbanks/questionbank";

import ExamLive from "./components/examlive/examlive";

require("dotenv").config();

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/exams" exact component={Exams} />
                    <Route path="/exams/:examId" exact component={Exam} />
                    <Route path="/classes" exact component={Classes} />
                    <Route path="/classes/:classId" exact component={Class} />
                    <Route
                        path="/questionbanks"
                        exact
                        component={QuestionBanks}
                    />
                    <Route
                        path="/questionbanks/:questionBankId"
                        exact
                        component={QuestionBank}
                    />
                    <Route
                        path="/examlive/:examinerId/:examId"
                        exact
                        component={ExamLive}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
