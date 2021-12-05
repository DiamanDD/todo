import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/root-redicer";
import {setErrorMessageAC} from "../../store/app-reducer";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackBar() {
    const error =useSelector<AppStateType, string |null>(state => state.appReducer.error)
    const dispatch=useDispatch()
    // const [open, setOpen] = React.useState(true);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setErrorMessageAC(null))
    };

    // const isOpen=error && null
    return (


        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>


    );
}
