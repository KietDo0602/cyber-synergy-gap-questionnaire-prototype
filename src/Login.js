import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, Link } from 'react-router-dom';
import logo from "./resources/images/logo.png";
import axios from 'axios';

const theme = createTheme();

export default function Login() {
  const [valid, setValid] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const loginInfo = {email, password};
    try {
      const login = await axios.post('http://localhost:4001/users/login', loginInfo);
      console.log("The status is:" + login.status)
      if (login.status === 200) {
        console.log(login);
        localStorage.setItem("token", login.data.token);
        const tokens = login.data.token;
        const refreshTokens = login.data.refreshToken;
        const admin = login.data.admin;
        const uid = login.data._id;
        const userStorage = {uid, email, admin, tokens, refreshTokens};
        const saved = JSON.stringify(userStorage);
        localStorage.setItem("user", saved);
        setValid("true");
        return;
      }
      setValid("false");
      return;

    } catch (err) {
      setValid("false");
      return;
    }
      
  };

  return (
    <ThemeProvider theme={theme}>
      {valid === "true" ? <Redirect to="/dashboard"/> : null}
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
            Assessment Tool
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {valid === "false" ? <h4 className="error"> Invalid username or password. Please try again. </h4> : null}
            {valid === "true" ? <h4 className="success"> Login Successful. </h4> : null}
              <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Link to='/register'> 
                <h3 className="link">Don't have an account? Create one now!</h3>
              </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}