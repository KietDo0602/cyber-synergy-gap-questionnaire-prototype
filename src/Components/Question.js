import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { TextField, Button } from "@mui/material";

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

export function Question (props) {
    const token = localStorage.getItem("token");
    const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
    const saved = localStorage.getItem("user");
    const [storedUser, setStoredUser] = useState(JSON.parse(saved));
    const [answers, setAnswer] = useState(null);
    const [arr, setArr] = useState([]);
    const [checkedState, setCheckedState] = useState([false, false, false, false]);

    useEffect(() => {
        async function getQuestionPrompt() {
            if (storedUser === null || props.questionType !== 1) return;
            let answerArr = props.choices;
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
            if (props.questionType === 1) {
                const Answer = await getAnswer(token, props.qid);
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
                console.log("Get 2nd question Type: ", arr1);
                setCheckedState(arr1);
            } else {
                const Answer = await getAnswer(token, props.qid);
                setAnswer(Answer);
            }
        }
        getQuestionPrompt();
        fetchAnswer();
    }, []);
    

    const onChangeQT0 = async (e) => {
        setAnswer(e);
        let config = {
            headers: {
                "x-access-token": token,
            }
        }
        let weight = 0;
        for (let i = 0; i < props.choices.length; i++) {
            if (props.choices[i].tag === e) {
                weight += props.choices[i].weight;
                break;
            }
        }
        console.log(e);
        const QT0Answer = {questionId: props.qid, category: props.section, answer: e, weight: weight, questionType: 0};
        const res = await axios.post('http://localhost:4001/clients/answer', QT0Answer, config);
        console.log(res);
    }

    const handleOnChange = async (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let arr = [];
        let weight = 0;
        for (let i = 0; i < updatedCheckedState.length; i++) {
            if (updatedCheckedState[i]) {
                arr.push(ALPHABET[i]);
                weight += props.choices[i].weight;
            }
        }
        const QT1Answer = {questionId: props.qid, category: props.section, answer: arr, weight: weight, questionType: 1};
        let config = {
            headers: {
                "x-access-token": token,
            }
        }
        const res = await axios.post('http://localhost:4001/clients/answer', QT1Answer, config);
        console.log(res);
    };

    
    const onChangeQT2 = async (e) => {
        e.persist();
        setAnswer(e.target.value);
        let config = {
            headers: {
                "x-access-token": token,
            }
        }
        const QT2Answer = {questionId: props.qid, category: props.section, answer: e.target.value, weight: 0, questionType: 2};
        const res = await axios.post('http://localhost:4001/clients/answer', QT2Answer, config);
        console.log(res);
    }
    
    
    const onFileChange = async (e) => {
        e.preventDefault();
        if (e === null) return;
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('questionId', props.qid);
        data.append('category', props.section);
        
        var config = {
        method: 'post',
        url: 'http://localhost:4001/clients/answerdoc',
        headers: {
            "Content-Type": "multipart/form-data",
            'x-access-token': token
        },
        data : data
        };
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
        setAnswer(e.target.files[0]);
    }

    return (
        <div>
            <h3>
                {props.question}
            </h3>

            {/* Multiple Choice */}
            {   props.questionType === 0 ? 
                <div>
                    <RadioGroup horizontal onChange={onChangeQT0} value={answers}>
                    {props.choices.map((choice) => {
                            return (
                            <ReversedRadioButton rootColor="black" pointColor="#60a44c" value={choice.tag}>
                                <h4> ({choice.tag}) {choice.answer} </h4>
                            </ReversedRadioButton>
                            );
                    })}
                    </RadioGroup>
                </div>
                : null
            }

            {/* Select all that applies */}
            {   props.questionType === 1 ? 
                <form>
                    {arr.map(({ name, value }, index) => {
                    return (
                        <div className="list-item">
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
                </form>
                : null
            }

            {/* Type in answers */}
            {   props.questionType === 2 ?
                <div>
                    <TextField value={answers} onChange={onChangeQT2} margin="normal" variant="outlined" className="textArea" inputProps={{style: {fontSize: 20}}}/>
                </div>
                : null
            }

            {/* Upload documents */}
            {   props.questionType === 3 ?
                <div className="fileInformation">
                    <h4 className="fileDescription"> {answers ? answers.name : "No file Chosen."} </h4>
                    <Button onChange={onFileChange} className="uploadButton" variant="outlined" component="label" > <h3>Choose File</h3> <input type="file" accept="image/*,application/pdf" hidden /> </Button>
                </div>
                : null
            }
            
        </div>
    );
}