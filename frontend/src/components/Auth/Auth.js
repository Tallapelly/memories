import React ,{useState,useEffect}from "react";
import { Avatar,Button,Paper,Grid,Typography,Container} from "@material-ui/core";
import useStyles from "./styles"
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./Input";
import {GoogleLogin} from "react-google-login";
import { gapi } from "gapi-script";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//import Login from "./Login";
import {signin,signup} from "../../actions/auth"
const initalState = {firstName:" ",lastName: " ",email:" ",password:" ",confirmPassword:" "};


const Auth = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [formData,setFormData]=useState(initalState);

    const handleShowPassword = ()=> setShowPassword((prevShowPassword)=> !prevShowPassword);
    const clientId = "943904114631-8h8n5u02oufkssu55bktkj86r2ggvofk.apps.googleusercontent.com";
    const initClient= () => {
        gapi.auth2.init({
            'clientId': clientId
        })
    }
    useEffect(()=>{
        gapi.load("client",initClient)
    },[])
    const googleSuccess= async (res)=>{
        const result = res?.profileObj;//we wont get error using this//undefiend
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH',data:{result,token}});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
       console.log(res)
    } 
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later")
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData,history))
        } else {
            dispatch(signin(formData,history))
        }
    };
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const switchMode =() =>{
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        setShowPassword(false)
    }
   
         
    return(
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={5}>
                    <Avatar className={classes.avatar}>
                        <LockOutLinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name = "firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                        <Input name = "lastName" label="Last Name" handleChange={handleChange}  half/>  
                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"}  handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password'/>}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary"  className={classes.submit}>
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        <GoogleLogin 
                            clientId={clientId}
                            render={(renderProps) =>(
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disable={renderProps.disabled} startIcon={<Icon/>} variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess = {googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={"single_host_origin"}
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth;



