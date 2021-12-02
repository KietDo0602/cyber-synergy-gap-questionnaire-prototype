import axios from 'axios';
import {useState, useEffect} from 'react';
import {Question} from './Question';

// Retrieve all questions of a section from backend
// Map through the array of questions and pass in qid
// Each question will submit answer on change
// Inside each question component, get the specified questions, question types and answers, and the previous answers if it exists
// If submitted is true, this will submit this question automatically with the answer inside it

export function QuestionComponent(props) {
    const [allQuestions, setAllQuestions] = useState([]);
    let i = 1;

    useEffect(() => {
        async function fetchQuestion() {
            const questionData = await axios.get(`http://localhost:4001/clients/questions/${props.category}&${props.level}`);
            setAllQuestions(questionData.data);
        }
        fetchQuestion();
    }, []);

    let QuestionList = allQuestions.map(question => {
        return (
            <div>
                <h2> Question: {i}</h2>
                <Question no={i++} qid={question.qid} question={question.question} 
                choices={question.answers} questionType={question.questionType} section={question.category} />
            </div>
        )
    });

    return (
        <div>
            {QuestionList}
        </div>
    );
}
