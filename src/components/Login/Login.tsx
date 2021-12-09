import {Field, Formik, useFormik} from "formik";
import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {Button} from "@mui/material";


export const Login = () => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

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
                errors.password="REQ"
            }
            return errors;
        },

        onSubmit: values => {
            if (!values.email) {
            }

            alert(JSON.stringify(values, null, 2));
        },
    })


    return (
        <div>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>

                        <form onSubmit={formik.handleSubmit}>
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
                                                  label={"Remember me"}/>
                                <Button type={"submit"} variant={"contained"} color={"primary"}>

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
