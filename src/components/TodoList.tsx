import React, {useCallback, useEffect} from "react";
import {AddItemFormAddItem} from "./AddItemFormAddItemForm/AddItemFormAddItem";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {selectedfilterType} from "./App/AppWithREDUX";
import {Tasks} from "./Tasks";
import {TasksDomainType, TaskStatuses} from "../api/todolosts-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../store/tasks-reducer";
import {TodoListDomainType} from "../store/todolists-reducer";

export type propsType = {
    todolist: TodoListDomainType
    tasks: Array<TasksDomainType>
    removeItems: (id: string, todoListId: string) => void
    selectedParametr: (value: selectedfilterType, todoLostId: string) => void
    newTasks: (title: string, todoListId: string) => void
    setActiveChecked: (id: string, status: TaskStatuses, todoListId: string) => void
    deleteTodolist: (todoListId: string) => void
    setUpdTask: (id: string, newTitle: string, todoListId: string) => void
    onChangeNewTodolistprops: (newTitle: string, todoListId: string) => void
}

export const TodoList = React.memo(({todolist, ...props}: propsType) => {
    const dispatch = useDispatch()
    console.log("TodoList is called")
    const {newTasks, selectedParametr, deleteTodolist, onChangeNewTodolistprops,} = props
    let taskForTodoList = props.tasks
    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])
    const addTask = useCallback((title: string) => {
        newTasks(title.trim(), todolist.id)
    }, [newTasks, todolist.id])
    const onClickALL = () => (selectedParametr("All", todolist.id))
    const onClickActive = () => (selectedParametr("Active", todolist.id))
    const onClickCompleted = () => (selectedParametr("Completed", todolist.id))
    const deletTodolist = () => deleteTodolist(todolist.id)
    const onChangeNewTodolist = useCallback((newTitle: string) => onChangeNewTodolistprops(newTitle, todolist.id), [onChangeNewTodolistprops, todolist.id])



    if (todolist.filter === "Active") {
        taskForTodoList = taskForTodoList.filter(s => (s.status === TaskStatuses.New))
    }
    if (todolist.filter === "Completed") {
        taskForTodoList = taskForTodoList.filter(s => (s.status === TaskStatuses.Competed))
    }
    return (
        <div key={todolist.id}>

            <h3>
                <Grid container>
                    <Grid item xs={9}>
                        <EditableSpan
                            title={todolist.title}
                            onChange={onChangeNewTodolist}/>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton onClick={deletTodolist} aria-label="delete"
                                    disabled={todolist.entytyStatus === "loading"}>
                            <Delete/>
                        </IconButton>
                    </Grid>
                </Grid>
            </h3>
            <AddItemFormAddItem newTasks={addTask} disabled={todolist.entytyStatus === "loading"}/>
            <div>
                {
                    taskForTodoList.map((elem) =>
                        <Tasks
                            key={elem.id}
                            tasks={elem}
                            todolistId={todolist.id}
                            setUpdTask={props.setUpdTask}
                            setActiveChecked={props.setActiveChecked}
                            removeItems={props.removeItems}/>
                    )
                }
            </div>
            <div>
                <Button variant={todolist.filter === "All" ? "contained" : "outlined"} color="primary"
                        onClick={onClickALL}>
                    All
                </Button>
                <Button variant={todolist.filter === "Active" ? "contained" : "outlined"} color="primary"
                        onClick={onClickActive}>
                    Active
                </Button>
                <Button variant={todolist.filter === "Completed" ? "contained" : "outlined"} color="primary"
                        onClick={onClickCompleted}>
                    Completed
                </Button>
            </div>
        </div>


    )
})


