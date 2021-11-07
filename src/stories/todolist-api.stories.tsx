import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListAPI} from "../api/todolosts-api";


export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then((res) => {

                setState(JSON.stringify(res.data))
            })
            .catch((rej) => {
                console.log(rej)
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const newTitle = "blabla"
    useEffect(() => {
        todoListAPI.createTodolist(newTitle).then((res) => {
            setState(JSON.stringify(res.data))
        })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "29bb7fe5-0104-4c7d-a718-2cbed69a8831"
    useEffect(() => {
        todoListAPI.deleteTodoList(todoListId).then((res) => {
            setState(JSON.stringify(res.data))
        })
            .catch((rej) => {
                debugger
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "c23cf8bb-3393-4324-aab0-b1125eaaf596"
    const newTitle = "BlaBlaBla"
    useEffect(() => {
        todoListAPI.updateTodoList(todoListId, newTitle).then((res) => {

            setState(JSON.stringify(res.data))
        })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const GetTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "577a2955-9059-4bba-afc2-14cfd5d733fd"
    useEffect(() => {

        todoListAPI.getTasks(todoListId)
            .then((res) => {

                setState(JSON.stringify(res.data))
            })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "577a2955-9059-4bba-afc2-14cfd5d733fd"
    const taskTitle="Task 2"
    useEffect(() => {
        todoListAPI.createTask(todoListId,taskTitle)
            .then((res) => {

                setState(JSON.stringify(res.data))
            })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "577a2955-9059-4bba-afc2-14cfd5d733fd"
    const taskId="fa701982-ea0c-4a12-8291-7fe9f16fa5bf"
    useEffect(() => {
        todoListAPI.deleteTask(todoListId,taskId)
            .then((res) => {

                setState(JSON.stringify(res.data))
            })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = "577a2955-9059-4bba-afc2-14cfd5d733fd"
    const taskId="8c328c6c-086a-4fb2-abfd-1266e6b69822"
    const task={
        title: "Таска1",
        description: "тест1",
        completed: false,
        status: 1,
        priority: 5,
        startDate: null,
        deadline: null,
    }
    useEffect(() => {
        todoListAPI.updateTask(todoListId,taskId,task)
            .then((res) => {

                setState(JSON.stringify(res.data))
            })
            .catch((rej) => {
                setState(JSON.stringify(rej))
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

