import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormAddItemForm = {
    newTasks: (title: string) => void


}
export const AddItemFormAddItem = (props: AddItemFormAddItemForm) => {

    const [title, setTitel] = useState("")
    const [error, seterror] = useState("")
    const setError = error ? <div className={"textError"}>{error}</div> : null
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
        <div>
            <input value={title}
                   className={error ? "error" : ""}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {setError}
        </div>
    )

}