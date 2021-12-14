import {useFormik} from "formik";
import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {setInitializationTC} from "../../store/login-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/root-redicer";
import {Navigate} from "react-router-dom";

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    capcha?:string
}
export const Login = () => {
    const dispatch=useDispatch()
    const isAuth=useSelector<AppStateType>(state =>state.loginReducer.isAuth )
     const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password){
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setInitializationTC(values))
        },
    })
    if(isAuth)  {
        return <Navigate to={"/"}/>
    }
    return (
        <div>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>Hello</p>
                        </FormLabel>

                        <form onSubmit={formik.handleSubmit} >
                            <FormGroup>
                                <TextField label={"Email"}
                                           name={"email"}
                                           margin={"normal"}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.email}/>
                                {formik.errors.email && <div id="feedback">{formik.errors.email}</div>}
                                <TextField type={"password"}
                                           name={"password"}
                                           label={"password"}
                                           margin={"normal"}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}
                                           value={formik.values.password}/>
                                {formik.errors.password && <div id="feedback">{formik.errors.password}</div>}
                                <FormControlLabel name={"rememberMe"}
                                                  control={<Checkbox/>}
                                                  onChange={formik.handleChange}
                                                  label={"Remember me"}
                                                  checked={formik.values.rememberMe}
                                />
                                <Button type={"submit"} variant={"contained"} color={"primary"}  >
                                    Login
                                </Button>
                            </FormGroup>

                        </form>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}
