
import './Dashboard.css';
import React, {useState, useEffect} from 'react';
import Pie from './Components/Pie';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export function Dashboard(props) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState(1);
  const [complete, setComplete] = useState(false);
  const [acPercentage, setAcPercentage] = useState(0);
  const [iaPercentage, setIaPercentage] = useState(0);
  const [mpPercentage, setMpPercentage] = useState(0);
  const [pePercentage, setPePercentage] = useState(0);
  const [scPercentage, setScPercentage] = useState(0);
  const [siPercentage, setSiPercentage] = useState(0);


  const retrieveCorrectnessPercentage = async (category, level) => {
    let config = {
      headers: {
          "x-access-token": token,
      }
    } 
    const res = await axios.get(`http://localhost:4001/clients/correctness/${category}&${level}`, config);
    return res.data.percent;
  }

  const retrieveCopmpletePercentage = async (category, level) => {
    let config = {
      headers: {
          "x-access-token": token,
      }
    } 
    const res = await axios.get(`http://localhost:4001/clients/completion/${category}&${level}`, config);
    return res.data.percent;
  }

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(false);
      const acPercent = await retrieveCorrectnessPercentage("AC", 1);
      const iaPercent = await retrieveCorrectnessPercentage("IA", 1);
      const mpPercent = await retrieveCorrectnessPercentage("MP", 1);
      const pePercent = await retrieveCorrectnessPercentage("PE", 1);
      const scPercent = await retrieveCorrectnessPercentage("SC", 1);
      const siPercent = await retrieveCorrectnessPercentage("SI", 1);
      const acCompletePercent = await retrieveCopmpletePercentage("AC", 1);
      const iaCompletePercent = await retrieveCopmpletePercentage("IA", 1);
      const mpCompletePercent = await retrieveCopmpletePercentage("MP", 1);
      const peCompletePercent = await retrieveCopmpletePercentage("PE", 1);
      const scCompletePercent = await retrieveCopmpletePercentage("SC", 1);
      const siCompletePercent = await retrieveCopmpletePercentage("SI", 1);

      if (complete) {
        setAcPercentage(acPercent);
        setIaPercentage(iaPercent);
        setMpPercentage(mpPercent);
        setPePercentage(pePercent);
        setScPercentage(scPercent);
        setSiPercentage(siPercent);
        setLoading(true);
      } else {
        setAcPercentage(acCompletePercent);
        setIaPercentage(iaCompletePercent);
        setMpPercentage(mpCompletePercent);
        setPePercentage(peCompletePercent);
        setScPercentage(scCompletePercent);
        setSiPercentage(siCompletePercent);
        setLoading(true);
      }
    }
    fetchMyAPI()
  }, [complete])

  const GenerateColorFromPercentage = (percentage) => {
    if (percentage < 15) {
      return '#FF0000';
    } else if (percentage < 35) {
      return '#FFAB35';
    }  else if (percentage < 50) {
      return '#CCC72B';
    }  else if (percentage < 70) {
      return '#AAFF00';
    }  else if (percentage < 85) {
      return '#4DE800';
    } else {
      return '#47D13D';
    } 
  }

  const handleComplete = (e) => {
    setComplete(!complete);
  }

  const handleLevel = (event) => {
    setLevel(event.target.value);
  }

  return (
    <>
    {/* Level Dropdown Menu */}
    <div className="DropDown">
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          onChange={handleLevel}
          label="Level"
        >
          <MenuItem value={1}> 1 </MenuItem>
          <MenuItem value={2}> 2 </MenuItem>
          <MenuItem value={3}> 3 </MenuItem>
        </Select>
      </FormControl>
    </div>
    <div className="toggleCompleteness">
      <FormControlLabel control={<Checkbox checked={complete} onChange={handleComplete}/>} label={<span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{ "Show Completion Mark" }</span>} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}/>
    </div>
    {/* List of progress bars that tracks the progress of each user */}
    {
    !loading ? 
      <div className="top">
        <CircularProgress style={{'color': 'green'}}/>
      </div>
    :
    <div className="pie-container">
      <div className="progress-bar">
        <Link to='/acmenu'>
          <Pie percentage={acPercentage} colour={GenerateColorFromPercentage(acPercentage)} />
        </Link>
        <h1><b> AC </b></h1>
      </div>
      <div className="progress-bar">
        <Link to='/iamenu'>
          <Pie percentage={iaPercentage} colour={GenerateColorFromPercentage(iaPercentage)} />
        </Link>
        <h1><b> IA </b></h1>
      </div>
      <div className="progress-bar">
        <Link to='/mpmenu'>
          <Pie percentage={mpPercentage} colour={GenerateColorFromPercentage(mpPercentage)} />
        </Link>
        <h1><b> MP </b></h1>
      </div>
      <div className="progress-bar">
        <Link to='/pemenu'>
          <Pie percentage={pePercentage} colour={GenerateColorFromPercentage(pePercentage)} />
        </Link>
        <h1><b> PE </b></h1>
      </div>
      <div className="progress-bar">
        <Link to='/scmenu'>
          <Pie percentage={scPercentage} colour={GenerateColorFromPercentage(scPercentage)} />
        </Link>
        <h1><b> SC </b></h1>
      </div>
      <div className="progress-bar">
        <Link to='/simenu'>
          <Pie percentage={siPercentage} colour={GenerateColorFromPercentage(siPercentage)} />
        </Link>
        <h1><b> SI </b></h1>
      </div>
    </div>
    }
  </>
  );
}
