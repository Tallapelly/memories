import React ,{useEffect} from "react";
//import { useDispatch } from "react-redux";
import {GoogleLogin} from "react-google-login";
import { gapi } from "gapi-script";
import Icon from "./icon";
import { Button} from "@material-ui/core";
import useStyles from "./styles"
const Login = () =>{
   // const dispatch = useDispatch();
    const classes = useStyles();
    const clientId = "943904114631-8h8n5u02oufkssu55bktkj86r2ggvofk.apps.googleusercontent.com";
    const initClient= () => {
        gapi.client.init({
            'clientId': clientId
        })
    }
    useEffect(()=>{
        gapi.load("client",initClient)
    },[])
    const googleSuccess= async (res)=>{
       console.log(res)
    } 
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later")
    }
    return(
        <div>
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
        </div>
    )

}

export default Login;
