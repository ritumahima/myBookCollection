import React,{useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PaymentDetails from './PaymentDetails';
import AddressForm from './AddressForm';
import ReviewOrder from './ReviewOrder';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
        position: 'relative',
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      stepper: {
        padding: theme.spacing(3, 0, 5),
      },
      buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
      },
      
  }));

  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  
function getStepContent(step) {
  switch (step) {
  
    case 0:
      return <AddressForm/>;

    case 1:
      return <PaymentDetails />;  

    case 2:
        return <ReviewOrder />;    
    
    default:
      throw new Error('Unknown step');
  }
}

const PaymentDashboard = () => {

    const [paymentDashboard,setpaymentDashboard] = useState(null);
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
          history.push("/login");
      };

      const classes = useStyles(); 
      const [activeStep, setActiveStep] = React.useState(0);
  
      const handleNext = () => {
          setActiveStep(activeStep + 1);
      };
  
      const handleBack = () => {
          setActiveStep(activeStep - 1);
      };   

      useEffect(() => {
        fetch("http://localhost:3000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then(({ error, data }) => {
            setpaymentDashboard(data);
          });
      }, []);
    
    
    return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Payment Dashboard
            </Typography>
            <span className="navbar-text">Welcome Ritu!</span>
            <Button color="inherit" onClick={() => logout()}>Logout</Button>
         </Toolbar>
        </AppBar>
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                {/* <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography> */}
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                        </Typography>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} className={classes.button}>
                            Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                        </div>
                    </React.Fragment>
                    )}
                </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
      </div>
    ); 
}

export default PaymentDashboard;