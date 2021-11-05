
import Button from '@mui/material/Button';
import Send from '@mui/icons-material/Send';
import {Link} from 'react-router-dom';
import React from 'react';

export default class PEMenu extends React.Component {
  render() {
      return (
      <div className="firstPage">
        <div className="App">
          <h1 className="firstPageTitle"> Gap Analysis Questionnaire </h1>
          <h1 className="firstPageTitle"> Physical Protection (PE) </h1>
        </div>
        <div className="back-button-container">
          <Link to="/mp5" style={{ textDecoration: 'none' }}>
            <Button className="button" variant="outlined"> <h3>Back</h3> </Button>        
          </Link>
        </div>
        <div className="button-container">
          <Link to="/pe1" style={{ textDecoration: 'none' }}> 
            <Button variant="outlined" endIcon={<Send />}> <h3>Start</h3> </Button>        
          </Link>
        </div>
      </div>
      );
  }
}
