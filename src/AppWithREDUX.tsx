import React, {useCallback} from "react";
import "./App.css";
import {taskType, TodoList} from "./components/TodoList";
import {AddItemFormAddItem} from "./components/AddItemFormAddItemForm/AddItemFormAddItem";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolostAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodolostAC
} from "./store/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, removeTaskAC, updateTaskAC} from "./store/tasks-reducer";
import {AppStateType} from "./store/root-redicer";
import {useDispatch, useSelector} from "react-redux";

export type todoListType = {
    id: string
    title: string
    filter: selectedfilterType

}
export type TascsStateType = {
    [key: string]: Array<taskType>
}
export type selectedfilterType = "All" | "Active" | "Completed"


function App() {
    console.log("App is called")

    const todoList = useSelector<AppStateType, Array<todoListType>>(store => store.todoListReducer)
    const tasks = useSelector<AppStateType, TascsStateType>(store => store.tasksReducer)
    const dispatch = useDispatch()

    const changeTodolistFilter = useCallback((filter: selectedfilterType, todoLostId: string) => {

        dispatch(changeTodolistFilterAC(todoLostId, filter))
    }, [dispatch])

    const removeTodolist = useCallback((todolistid: string) => {

        dispatch(removeTodolostAC(todolistid))


    }, [dispatch])
    const addTodolist = useCallback((newTodoListTitle: string) => {
        dispatch(addTodolostAC(newTodoListTitle))
    }, [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {

        dispatch(changeTodoListTitleAC(todoListId, newTitle))

    }, [dispatch])

    const changeStatusTask = useCallback((id: string, isDone: boolean, todoListId: string) => {

        dispatch(changeStatusTaskAC(id, isDone, todoListId))

    }, [dispatch])
    const updateTask = useCallback((id: string, newTitle: string, todoListId: string) => {

        dispatch(updateTaskAC(id, newTitle, todoListId))

    }, [dispatch])
    const removeTask = useCallback((id: string, todoListId: string) => {

        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {

        dispatch(addTaskAC(title, todoListId))
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
                            // if (tl.filter === "Active") (taskForTodoList = taskForTodoList.filter(s => (s.isDone)))
                            // else if (tl.filter === "Completed") (taskForTodoList = taskForTodoList.filter(s => (!s.isDone)))


                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: "20px"}} elevation={3}>
                                        <TodoList


                                            id={tl.id}
                                            titles={tl.title}
                                            removeItems={removeTask}
                                            tasks={taskForTodoList}
                                       // tasks={tasks}
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



