import React, {ChangeEvent, useState} from "react";

export type EditableSpan = {
    title: string
    onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpan) => {
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
        editMode ? <input autoFocus onBlur={activatedViewMode} onChange={onChangeHandler} value={title}/> :
            <span onDoubleClick={activateeditMode}>{props.title}</span>
    )
}