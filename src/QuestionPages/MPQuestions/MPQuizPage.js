import React, {useState} from "react";
import {Link} from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import Send from '@mui/icons-material/Send';
import Info from '@mui/icons-material/Info';
import PopUp from "../../Components/PopUp";
import { QuestionComponent } from "../../Components/QuestionComponent";

export function MPQuizPage(props) {
    const SECTION = "MP";
    const LEVEL = 1;

    const [seen, setSeen] = useState(false);
    const togglePop = () => {
      setSeen(!seen);
    };

    return (
        <>
            {seen ? <PopUp toggle={togglePop} content="This is some info about Media Protection questions"/> : null}
            <div className="infoButton">
                <IconButton color="primary" onClick={togglePop}>
                    <Info fontSize="large"/>
                </IconButton>
            </div>
            <div className="backgroundDiv">
                <div className="top">
                    <h1>Media Protection (MP)</h1>
                </div>
                <div className="submit-button-container"> 
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button className="button" variant="outlined" endIcon={<Send />}> Done </Button>        
                    </Link>
                </div>
                <div className="ScrollingDiv">
                    <div className="qContainer">
                        <QuestionComponent category={SECTION} level={LEVEL}/>
                        <div className="bottomPadding"/>
                    </div>
                </div>
            </div>
        </>
    );
}