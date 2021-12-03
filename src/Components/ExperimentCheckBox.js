import { useState, useEffect } from "react";
import { toppings1 } from "./utils/toppings";
import axios from 'axios';
import { IconButton, Button } from "@mui/material";
import Send from '@mui/icons-material/Send';

export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const getAnswer = async (token, qid) => {
    let config = {
        headers: {
            "x-access-token": token,
        }
    }

    const res = await axios.get(`http://localhost:4001/clients/answered/${qid}`, config);
    if (res === null || res.status !== 200) return null;
    return res.data.answer;
}

export function ExperimentCheckBox() {
    const saved = localStorage.getItem("user");
    const [storedUser, setStoredUser] = useState(JSON.parse(saved));
    const [arr, setArr] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        async function getQuestionPrompt() {
            if (storedUser === null) return;
            const questionData = await axios.get(`http://localhost:4001/clients/question/1.001`);
            let answerArr = questionData.data.answers;
            let array = [];
            for (let i = 0; i < answerArr.length; i++) {
                let name = answerArr[i].tag;
                let value = answerArr[i].answer;
                array.push({name: name, value: value});
            }
            setArr(array);
        }
        async function fetchAnswer() {
            if (storedUser === null) return;
            const Answer = await getAnswer(storedUser.tokens, 1.001);
            let arr1 = new Array(4).fill(false);
            let index = 0;
            for (let i = 0; i < 4; i++) {
                if (Answer[index] === ALPHABET[i]) {
                    arr1[i] = true;
                    index++;
                } else {
                    arr1[i] = false;
                }
            }
            setCheckedState(arr1);
            console.log("Arr1: ", arr1); // Set Checked State this to show answer
        }
        getQuestionPrompt();
        fetchAnswer();
    }, []);

    const handleSubmit = (e) => {
        console.log("This is the checked State: ", checkedState);
        let arr2 = [];
        for (let i = 0; i < checkedState.length; i++) {
            if (checkedState[i] === true) {
                arr2.push(ALPHABET[i]);
            }
        }

    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        console.log(updatedCheckedState);
    };

    return (
        <div className="App">
        <form>
            {arr.map(({ name, value }, index) => {
            return (
                <div className="toppings-list-item">
                    <div className="left-section">
                    <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`custom-checkbox-${index}`}>({name}) </label>
                    <label htmlFor={`custom-checkbox-${index}`}>{value}</label>
                    </div>
                </div>
            );
            })}
             <Button onClick={handleSubmit} className="button" variant="outlined" endIcon={<Send />}> Submit </Button>
        </form>
        </div>
    );
}
