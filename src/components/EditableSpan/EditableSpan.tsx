import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    onChange:(newValue:string)=>void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, seteditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const activateeditMode = () => {
        seteditMode(true)
        setTitle(props.title)
    }
    const activatedViewMode = () => {
        seteditMode(false)
        props.onChange(title)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode ?  <TextField   id="outlined-basic" label="edit" variant="outlined" autoFocus onBlur={activatedViewMode} onChange={onChangeHandler} value={title}
                               /> :
            <span  onDoubleClick={activateeditMode} className={"spanstyle"}  title={props.title}>{props.title}</span>



)
}

