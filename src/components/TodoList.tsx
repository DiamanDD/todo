import React, {useCallback} from "react";

import {AddItemFormAddItem} from "./AddItemFormAddItemForm/AddItemFormAddItem";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {selectedfilterType} from "../AppWithREDUX";
import {Tasks} from "./Tasks";


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

    if (props.selectedfilter === "Active") {taskForTodoList = taskForTodoList.filter(s => (s.isDone))}
   if (props.selectedfilter === "Completed") {
    taskForTodoList = taskForTodoList.filter(s => (!s.isDone))}

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
                    // const deleteTasks = () => props.removeItems(elem.id, props.id)
                    // const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => props.setActiveChecked(elem.id, e.currentTarget.checked, props.id)
                    // const onChangeNewTask = (newTitle: string) => props.setUpdTask(elem.id, newTitle, props.id)
                    //
                    // return (
                    //
                    //     <div key={elem.id}>
                    //         <Grid container
                    //         >
                    //             <Grid item xs>
                    //                 <Checkbox
                    //                     id={props.id}
                    //
                    //                     checked={elem.isDone}
                    //                     onChange={onChangeCheked}
                    //                     name="checkedB"
                    //                     color="primary"
                    //                 />
                    //             </Grid>
                    //
                    //             <Grid item xs={4}>
                    //                 <EditableSpan title={elem.title} onChange={onChangeNewTask}/>
                    //             </Grid>
                    //             <Grid item xs>
                    //                 <IconButton aria-label="delete" onClick={deleteTasks}>
                    //                     <Delete/>
                    //                 </IconButton>
                    //             </Grid>
                    //         </Grid>
                    //     </div>
                    //
                    // )
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


