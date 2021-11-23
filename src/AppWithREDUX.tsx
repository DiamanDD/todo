import React, {useCallback, useEffect} from "react";
import "./App.css";
import {TodoList} from "./components/TodoList";
import {AddItemFormAddItem} from "./components/AddItemFormAddItemForm/AddItemFormAddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistThunk,
    removeTodoListTC,
    TodoListDomainType
} from "./store/todolists-reducer";
import {addTaskTC, removeTaskThunk, TascsStateType, updateTaskTC} from "./store/tasks-reducer";
import {AppStateType} from "./store/root-redicer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from "./api/todolosts-api";


export type selectedfilterType = "All" | "Active" | "Completed"


function App() {

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
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
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
                                            id={tl.id}
                                            titles={tl.title}
                                            removeItems={removeTask}
                                            tasks={taskForTodoList}
                                            newTasks={addTask}
                                            selectedfilter={tl.filter}
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
            </Container>
        </div>
    )


}

export default App;



