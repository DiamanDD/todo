import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";

type AddItemFormAddItemForm = {
    newTasks: (title: string) => void


}
export const AddItemFormAddItem = (props: AddItemFormAddItemForm) => {

    const [title, setTitel] = useState("")
    const [error, seterror] = useState("")

    const addItem = () => {
        title ? props.newTasks(title.trim()) : seterror("Поле пустое")
        setTitel("")
    }

    const onChangeHandler = (t: ChangeEvent<HTMLInputElement>) => {
        setTitel(t.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        seterror("")
        if (e.charCode === 13) addItem()
    }
    return (
        <div style={{margin:"15px"}}>
            <Grid container >
                <Grid item xs={9} >
                    <TextField id="outlined-basic"
                               label="Add item"
                               variant="outlined"
                               value={title}
                        // className={error ? "error" : ""}
                               error={!!error && true}
                               helperText={error ? "error" : ""}
                               onChange={onChangeHandler}
                               onKeyPress={onKeyPressHandler}



                    />
                </Grid>
                <Grid item xs={2}>

                    <Button onClick={addItem} variant="contained" color="primary"
                            style={{padding: "10px", marginLeft:"10px"}}>
                        +
                    </Button>
                </Grid>
            </Grid>

        </div>
    )

}