import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";
import {selectedfilterType} from "../App";


export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type propsType = {
    id:string
    titles: string;
    tasks: Array<taskType>
    removeItems: (id: string,todoListId:string) => void
    selectedParametr: (value: selectedfilterType,todoLostId:string) => void
    newTasks: (title: string,todoListId:string) => void
    selectedfilter: selectedfilterType
    setActiveChecked: (id: string, isDone: boolean,todoListId:string) => void
    deleteTodolist:(todoListId:string)=>void

}
export const TodoList = (props: propsType) => {
    const [error, seterror] = useState("")
    const setError = error ? <div className={"textError"}>{error}</div> : null
    const addTask = () => {
        title ? props.newTasks(title.trim(),props.id) : seterror("Поле пустое")
        setTitel("")
    }
    let [title, setTitel] = useState("")
    const onChangeHandler = (t: ChangeEvent<HTMLInputElement>) => {
        setTitel(t.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        seterror("")
        if (e.charCode === 13)addTask()
    }
    const onClickALL = () => (props.selectedParametr("All",props.id))

    const onClickActive = () => (props.selectedParametr("Active",props.id))
    const onClickCompleted = () => (props.selectedParametr("Completed",props.id))
    const deletTodolist=()=> props.deleteTodolist(props.id)
    return (
        <div key={props.id}>
            <h3>{props.titles} <button onClick={deletTodolist}>X</button></h3>

            <div>
                <input value={title}
                       className={error ? "error" : ""}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {setError}
            </div>
            <ul>
                {props.tasks.map((elem) => {
                        const deleteTasks = () => props.removeItems(elem.id,props.id)
                        const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => props.setActiveChecked(elem.id, e.currentTarget.checked,props.id)

                        return (
                            <li key={elem.id}><input
                                id={props.id}
                                type="checkbox"
                                checked={elem.isDone}
                                onChange={onChangeCheked}
                            />
                                <span>{elem.title}</span>
                                <button onClick={deleteTasks}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.selectedfilter === "All" ? "colorButtonFielter" : ""} onClick={onClickALL}>All
                </button>
                <button className={props.selectedfilter === "Active" ? "colorButtonFielter" : ""}
                        onClick={onClickActive}>Active
                </button>
                <button className={props.selectedfilter === "Completed" ? "colorButtonFielter" : ""}
                        onClick={onClickCompleted}>Completed
                </button>
            </div>
        </div>


    )
}


