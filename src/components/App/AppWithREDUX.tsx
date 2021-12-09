import React from "react";
import "./App.css";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AppStateType} from "../../store/root-redicer";
import {useSelector} from "react-redux";
import {ErrorSnackBar} from "../ErrorSnackBar/ErroorSnackBar";

import {Login} from "../Login/Login";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {Todolists} from "./Todolists/Todolists";


export type selectedfilterType = "All" | "Active" | "Completed"

function App() {
    const status = useSelector<AppStateType>(state => state.appReducer.status)

    return (
        <Router>
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
        </Router>

    )


}

export default App;


