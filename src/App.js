import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importing Components
import Classes from "./components/classes/classes";
import Class from "./components/classes/class";
import Exams from "./components/exams/exams";
import QuestionBanks from "./components/questionbanks/questionbanks";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/exams" exact component={Exams} />
                    <Route path="/classes" exact component={Classes} />
                    <Route path="/classes/:classId" exact component={Class} />
                    <Route
                        path="/questionbanks"
                        exact
                        component={QuestionBanks}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
