import React, {ChangeEvent} from "react";
import {selectedfilterType} from "../App";
import {AddItemFormAddItem} from "./AddItemFormAddItemForm/AddItemFormAddItem";
import {EditableSpan} from "./EditableSpan/EditableSpan";




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
    setUpdTask:(id:string,newTitle:string,todoListId:string)=>void
    onChangeNewTodolist:(newTitle:string,todoListId:string)=>void

}

export const TodoList = (props: propsType) => {
    const addTask = (title:string) => {
        props.newTasks(title.trim(),props.id)
    }


    const onClickALL = () => (props.selectedParametr("All",props.id))

    const onClickActive = () => (props.selectedParametr("Active",props.id))
    const onClickCompleted = () => (props.selectedParametr("Completed",props.id))
    const deletTodolist=()=> props.deleteTodolist(props.id)


    const onChangeNewTodolist = (newTitle:string) => props.onChangeNewTodolist(newTitle,props.id,)






    return (
        <div key={props.id}>

            <h3>
                <EditableSpan
                    title={props.titles}
                    onChange={onChangeNewTodolist}/>
                <button onClick={deletTodolist}>X</button>
            </h3>

            {/* eslint-disable-next-line react/jsx-no-undef */}
            <AddItemFormAddItem newTasks={addTask}/>

            <ul>
                {props.tasks.map((elem) => {
                        const deleteTasks = () => props.removeItems(elem.id,props.id)
                        const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => props.setActiveChecked(elem.id, e.currentTarget.checked,props.id)
                    const onChangeNewTask = (newTitle:string) => props.setUpdTask(elem.id,newTitle,props.id)

                        return (
                            <li key={elem.id}>
                                <input
                                id={props.id}
                                type="checkbox"
                                checked={elem.isDone}
                                onChange={onChangeCheked}
                            />
                                <EditableSpan title={elem.title} onChange={onChangeNewTask}/>
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


