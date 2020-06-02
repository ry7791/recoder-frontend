import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter, Link as RouterLink } from 'react-router-dom';

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignIn(props){

  const [users] = React.useState({
    name: 'user1',
    email: 'user1@email.com',
    gender: 0,
    regDate: '2020-05-30 00:00:00'
  })

    const classes = useStyles();

    const isEmail = email => {
      const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    
      return emailRegex.test(email);
    };
    const isPwd = pass => {
      const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      
      return pwdRegex.test(pass);
     }
  
    const onTextValidation = () => {
      let emailError = "";
      let pwdError = "";
  
      if(!isEmail(values.email))emailError = "email 형식이 아닙니다.";
      if(!isPwd(values.encryptedPassword))pwdError = "비밀번호는 최소 6자에서 20자사이, 영문과 숫자를 혼합하여 주세요."
  
      setError({
        emailError, pwdError
      })
  
      if(emailError || pwdError)return false;
      return true;
    }

    const [values, setValues] = React.useState({
      email: '',
      encryptedPassword: ''
    });
    const [error, setError] = React.useState({
      emailError: '',
      pwdError: ''
    })
    // const [users, setUsers] = React.useState({
    //   id: '',
    //   token: ''
    // })

    const handleChangeForm = e => {
      setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      const valid = onTextValidation();

    if(!valid)console.error("invalid");
    
    else{
      //id랑 token 받아오는거 해야함
      const url = '/users-service/recoder/login';
      axios.post(url, {
        email: values.email,
        encryptedPassword: values.encryptedPassword
      })
      // .then(response => response.data)
      // .then((data)=>{
      //   setUsers({id, token})
      //}) 
      console.log(values.email, values.encryptedPassword);
      setValues({
        email: "",
        encryptedPassword: ""
      })

      props.history.push({
        pathname: '/',
        state: {users}
      });
    }
    }

    return(
         <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChangeForm}
          />
          <div style={{ color: "red", fontSize: "12px" }}>
                {error.emailError}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="encryptedPassword"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.encryptedPassword}
                onChange={handleChangeForm}
          />
          <div style={{ color: "red", fontSize: "12px" }}>
                {error.pwdError}
          </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
