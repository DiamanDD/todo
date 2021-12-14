import React, {useEffect} from "react";
import "./App.css";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppStateType} from "../../store/root-redicer";
import {useDispatch, useSelector} from "react-redux";
import {ErrorSnackBar} from "../ErrorSnackBar/ErroorSnackBar";
import {Login} from "../Login/Login";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {Todolists} from "../Todolists/Todolists";
import {authMeTC} from "../../store/app-reducer";
import {LogOutTC} from "../../store/login-reduser";

export type selectedfilterType = "All" | "Active" | "Completed"

function App() {
    const status = useSelector<AppStateType>(state => state.appReducer.status)
    const isInitialuzed = useSelector<AppStateType>(state => state.appReducer.isInitialized)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(authMeTC())
    },[])
    if(!isInitialuzed){
        return <div>...Loading</div>
    }
    const logOut=()=>{
        dispatch(LogOutTC())
    }
    return (
    <BrowserRouter>
            <div className="App">

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit" onClick={logOut}>LogOut</Button>
                    </Toolbar>
                </AppBar>
                {status === "loading" && <LinearProgress/>}
                <ErrorSnackBar/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route  path="/" element={ <Todolists/>}/>
                    <Route  path="*" element={ <div>404 not found</div>}/>
                </Routes>

            </div>
    </BrowserRouter>
    )
}
export default App;


