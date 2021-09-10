import React, {ChangeEvent} from "react";
import {selectedfilterType} from "../App";
import {AddItemFormAddItem} from "./AddItemFormAddItemForm/AddItemFormAddItem";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type propsType = {
    id: string
    titles: string;
    tasks: Array<taskType>
    removeItems: (id: string, todoListId: string) => void
    selectedParametr: (value: selectedfilterType, todoLostId: string) => void
    newTasks: (title: string, todoListId: string) => void
    selectedfilter: selectedfilterType
    setActiveChecked: (id: string, isDone: boolean, todoListId: string) => void
    deleteTodolist: (todoListId: string) => void
    setUpdTask: (id: string, newTitle: string, todoListId: string) => void
    onChangeNewTodolist: (newTitle: string, todoListId: string) => void

}

export const TodoList = (props: propsType) => {

    const addTask = (title: string) => {
        props.newTasks(title.trim(), props.id)
    }



    const onClickALL = () => (props.selectedParametr("All", props.id))
    const onClickActive = () => (props.selectedParametr("Active", props.id))
    const onClickCompleted = () => (props.selectedParametr("Completed", props.id))
    const deletTodolist = () => props.deleteTodolist(props.id)


    const onChangeNewTodolist = (newTitle: string) => props.onChangeNewTodolist(newTitle, props.id,)


    return (
        <div key={props.id}>

            <h3>
                <Grid container >
                    <Grid item xs={9} >
                        <EditableSpan
                            title={props.titles}
                            onChange={onChangeNewTodolist}/>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton onClick={deletTodolist} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </Grid>
                </Grid>
            </h3>


            <AddItemFormAddItem newTasks={addTask}/>


            <div>
                {props.tasks.map((elem) => {
                    const deleteTasks = () => props.removeItems(elem.id, props.id)
                    const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => props.setActiveChecked(elem.id, e.currentTarget.checked, props.id)
                    const onChangeNewTask = (newTitle: string) => props.setUpdTask(elem.id, newTitle, props.id)

                    return (

                        <div key={elem.id}>
                            <Grid container
                            >
                                <Grid item xs>
                                    <Checkbox
                                        id={props.id}

                                        checked={elem.isDone}
                                        onChange={onChangeCheked}
                                        name="checkedB"
                                        color="primary"
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <EditableSpan title={elem.title} onChange={onChangeNewTask}/>
                                </Grid>
                                <Grid item xs>
                                    <IconButton aria-label="delete" onClick={deleteTasks}>
                                        <Delete/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>

                    )
                })
                }
            </div>
            <div>

                <Button variant={props.selectedfilter === "All" ? "contained" : "outlined"} color="primary"
                        onClick={onClickALL}>
                    All
                </Button>
                <Button variant={props.selectedfilter === "Active" ? "contained" : "outlined"} color="primary"
                        onClick={onClickActive}>
                    Active
                </Button>
                <Button variant={props.selectedfilter === "Completed" ? "contained" : "outlined"} color="primary"
                        onClick={onClickCompleted}>
                    Completed
                </Button>


            </div>
        </div>


    )
}


