import React, {useCallback, useEffect} from "react";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistThunk,
    removeTodoListTC,
    TodoListDomainType
} from "../../../store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../store/root-redicer";
import {addTaskTC, removeTaskThunk, TascsStateType, updateTaskTC} from "../../../store/tasks-reducer";
import {TaskStatuses} from "../../../api/todolosts-api";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemFormAddItem} from "../../AddItemFormAddItemForm/AddItemFormAddItem";
import {TodoList} from "../../TodoList";
import {selectedfilterType} from "../AppWithREDUX";

export const Todolists = () => {
    useEffect(() => {
        dispatch(fetchTodolistThunk())
    }, [])

    console.log("App is called")

    const todoList = useSelector<AppStateType, Array<TodoListDomainType>>(store => store.todoListReducer)
    const tasks = useSelector<AppStateType, TascsStateType>(store => store.tasksReducer)
    const dispatch = useDispatch()


    const changeTodolistFilter = useCallback((filter: selectedfilterType, todoLostId: string) => {
        dispatch(changeTodolistFilterAC(todoLostId, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistid: string) => {

        dispatch(removeTodoListTC(todolistid))
    }, [dispatch])
    const addTodolist = useCallback((newTodoListTitle: string) => {
        dispatch(addTodoListTC(newTodoListTitle))

    }, [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodolistTC(todoListId, newTitle))
    }, [dispatch])
    const changeStatusTask = useCallback((id: string, status: TaskStatuses, todoListId: string) => {

        dispatch(updateTaskTC(id, {status}, todoListId))
    }, [dispatch])
    const updateTask = useCallback((id: string, newTitle: string, todoListId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todoListId))
    }, [dispatch])
    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskThunk(id, todoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(title, todoListId))

    }, [dispatch])


    return (
        <Container fixed>
            <Grid container style={{padding: "30px"}}>
                <AddItemFormAddItem newTasks={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoList.map((tl) => {
                        let taskForTodoList = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "20px"}} elevation={3}>
                                    <TodoList
                                        todolist={tl}
                                        removeItems={removeTask}
                                        tasks={taskForTodoList}
                                        newTasks={addTask}
                                        setActiveChecked={changeStatusTask}
                                        deleteTodolist={removeTodolist}
                                        selectedParametr={changeTodolistFilter}
                                        setUpdTask={updateTask}
                                        onChangeNewTodolistprops={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })}
            </Grid>
        </Container>)


}