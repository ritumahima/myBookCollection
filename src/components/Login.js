import React,{ useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';                               /* npm install react-router-dom --save */
import { makeStyles } from '@material-ui/core/styles';                       /* npm install @material-ui/core */
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';               /* npm install @material-ui/icons */
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
//import MuiAlert from "@material-ui/lab/Alert";                                  /*  npm install @material-ui/lab */

import { useForm } from "react-hook-form";                                      /* npm install react-hook-form */

/* CSS styles */
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',           /* display random images */
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        },
        form: {
            width: '100%', 
            marginTop: theme.spacing(1),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
  }));

  
/* Function to display login form */   /* Used functional Component */

 function Login(){

    const classes = useStyles();

    /* useState is a Hook (function) that allows you to have state variables in functional components. 
    You pass the initial state to this function and it returns a variable with the current state 
    value (not necessarily the initial state) and another function to update this value. */

    const [email,setEmail]=useState("");   
    const [password,setPassword]=useState("");
    const { handleSubmit } = useForm();
    
    const history = useHistory();
    useEffect(()=>{                           // is a lifeCycle Hook 
        if(localStorage.getItem('token')){
            history.push("/paymentDashboard");
        }
    },[])                                      //condition 

    
    /* function to call API */
      
    async function onSubmit() {                                  /* async --> it will return a promise and can be handled by await */
      console.warn(email,password);                                   /* collect data inside object */
      let loginData = { email, password }; 
      
      const apiUrl = 'https://reqres.in/api/login';                       /* website for fake backend */
      let result = await fetch(apiUrl, {                                     /* fetch is inbuilt JavaScript method for getting resources from a server or an API endpoint */
        method: "POST",
        headers: {                                                              /* header contains object */
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        result = await result.json();
        localStorage.setItem("token",JSON.stringify(result));         /* Sets the value of the pair identified by key to value,creating a new key/value pair if none existed for key previously. */
        history.push("/paymentDashboard");
     };

    /* To display login form */
    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} /> 
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
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
                    onChange={(e)=>setEmail(e.target.value)}                 /* setState Email */
                />
            <br/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e)=>setPassword(e.target.value)}             /* setState Password */
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
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            </Grid>  
            </form>
        </div>
        </Grid>
     </Grid>
     );
};


export default Login;