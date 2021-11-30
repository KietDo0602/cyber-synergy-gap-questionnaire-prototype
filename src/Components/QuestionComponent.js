import axios from 'axios';
import react, {useState, useEffect} from 'react';
import {Question} from './Question';
import { IconButton, Button } from "@mui/material";
import Send from '@mui/icons-material/Send';

// Retrieve all questions of a section from backend
// Map through the array of questions and pass in qid, and submitted -> question component
// Inside each question component, get the specified questions, question types and answers, and the previous answers if it exists
// If submitted is true, this will submit this question automatically with the answer inside it

export function QuestionComponent() {
    const saved = localStorage.getItem("user");
    const storedUser = JSON.parse(saved);
    const [allQuestions, setAllQuestions] = useState([]);
    let i = 1;
    useEffect(() => {
        async function fetchQuestion() {
            const questionData = await axios.get(`http://localhost:4001/clients`);
            setAllQuestions(questionData.data);
        }
        async function fetchAnswer() {
            
        }
        fetchQuestion();
        fetchAnswer();
    }, []);

    const handleSubmit = (e) => {
        console.log(e);
    }

    console.log(allQuestions);
    let QuestionList = allQuestions.map(question => {
        return (
            <div>
                <h2> Question: {i++}</h2>
                <Question qid={question.qid} question={question.question} 
                choices={question.answers} questionType={question.questionType}/>
            </div>
        )
    });
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <h1>Access Control Questions</h1>
                {QuestionList}
            </form>
            <Button onClick={handleSubmit} className="button" variant="outlined" endIcon={<Send />}> Submit </Button>
        </div>
    );
}
