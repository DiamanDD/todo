import React, {useCallback} from "react";

import {AddItemFormAddItem} from "./AddItemFormAddItemForm/AddItemFormAddItem";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {selectedfilterType} from "../AppWithREDUX";
import {Tasks} from "./Tasks";
import {TaskStatuses, TasksType} from "../api/todolosts-api";


// export type taskType = {
//     id: string;
//     title: string;
//     isDone: boolean;
// }
export type propsType = {
    id: string
    titles: string;
    tasks: Array<TasksType>

    removeItems: (id: string, todoListId: string) => void
    selectedParametr: (value: selectedfilterType, todoLostId: string) => void
    newTasks: (title: string, todoListId: string) => void
    selectedfilter: selectedfilterType
    setActiveChecked: (id: string, status:TaskStatuses, todoListId: string) => void
    deleteTodolist: (todoListId: string) => void
    setUpdTask: (id: string, newTitle: string, todoListId: string) => void
    onChangeNewTodolistprops: (newTitle: string, todoListId: string) => void

}

export const TodoList =React.memo( (props: propsType) => {

    console.log("TodoList is called")
    const {id,newTasks,selectedParametr,deleteTodolist,onChangeNewTodolistprops}=props


    const addTask =useCallback( (title: string) => {
      newTasks(title.trim(), id)
    },[newTasks,id])



    const onClickALL = () => (selectedParametr("All", id))
    const onClickActive = () => (selectedParametr("Active", id))
    const onClickCompleted = () => (selectedParametr("Completed", id))
    const deletTodolist = () => deleteTodolist(id)


    const onChangeNewTodolist = useCallback( (newTitle: string) => onChangeNewTodolistprops(newTitle, id),[onChangeNewTodolistprops,id])
    let taskForTodoList = props.tasks

    if (props.selectedfilter === "Active") {taskForTodoList = taskForTodoList.filter(s => (s.status==TaskStatuses.New))}
   if (props.selectedfilter === "Completed") {
    taskForTodoList = taskForTodoList.filter(s => (s.status===TaskStatuses.Competed))}

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
                {
                    taskForTodoList.map((elem) =>

                    <Tasks
                        key={elem.id}
                        tasks={elem}
                        todolistId={props.id}
                        setUpdTask={props.setUpdTask}
                        setActiveChecked={props.setActiveChecked}
                        removeItems={props.removeItems}/>

                )
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
})


