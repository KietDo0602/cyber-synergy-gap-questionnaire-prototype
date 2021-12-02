import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login.js";
import Register from "./Register.js";
import ACMenu from "./QuestionPages/ACQuestions/ACMenu.js";
import {ACQuizPage} from './QuestionPages/ACQuestions/ACQuizPage';
import IAMenu from "./QuestionPages/IAQuestions/IAMenu.js";
import {IAQuizPage} from './QuestionPages/IAQuestions/IAQuizPage';
import MPMenu from "./QuestionPages/MPQuestions/MPMenu.js";
import {MPQuizPage} from './QuestionPages/MPQuestions/MPQuizPage';
import PEMenu from "./QuestionPages/PEQuestions/PEMenu.js";
import {PEQuizPage} from './QuestionPages/PEQuestions/PEQuizPage';
import SCMenu from "./QuestionPages/SCQuestions/SCMenu.js";
import {SCQuizPage} from './QuestionPages/SCQuestions/SCQuizPage';
import SIMenu from "./QuestionPages/SIQuestions/SIMenu.js";
import {SIQuizPage} from './QuestionPages/SIQuestions/SIQuizPage';
import {Dashboard} from "./Dashboard.js";
import SideBar from './Components/SideBar';

export function App() {
  return (
    <>
      <Router>
        <Switch> 
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <div>
            <SideBar />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/acmenu" component={ACMenu} />
            <Route path="/acquizpage" component={ACQuizPage} />
            <Route path="/iamenu" component={IAMenu} />
            <Route path="/iaquizpage" component={IAQuizPage} />
            <Route path="/mpmenu" component={MPMenu} />
            <Route path="/mpquizpage" component={MPQuizPage} />
            <Route path="/pemenu" component={PEMenu} />
            <Route path="/pequizpage" component={PEQuizPage} />
            <Route path="/scmenu" component={SCMenu} />
            <Route path="/scquizpage" component={SCQuizPage} />
            <Route path="/simenu" component={SIMenu} />
            <Route path="/siquizpage" component={SIQuizPage} />
          </div>
        </Switch>
      </Router>
    </>
  )
}

