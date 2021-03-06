import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, Link } from 'react-router-dom';
import logo from "./resources/images/logo.png";
import axios from 'axios';

const theme = createTheme();

export default function Register() {
  const [valid, setValid] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const companyName = data.get('companyName');
    const fname = data.get('fname');
    const lname = data.get('lname');
    const password = data.get('password');
    const registerInfo = {firstName: fname, lastName: lname, companyName: companyName, email: email, password: password};
    axios.post(`http://localhost:4001/users/add`, registerInfo).then(res => {
      setValid("true");
    }).catch(() => {
      setValid("false");
    })
  };

  return (
    <ThemeProvider theme={theme}>
      {valid === "true" ? <Redirect to="/"/> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img className="login-logo"src={logo} alt="Synergy Logo" />
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              name="lname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {valid === "false" ? <h4 className="error"> Company or Email is already taken. Please try again. </h4> : null}
            {valid === "true" ? <h4 className="success"> Register Successful. </h4> : null}
              <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
          </Box>
          <Link to='/login'> 
              <h3 className="link">Already have an account? Login now!</h3>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}