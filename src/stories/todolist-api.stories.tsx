import React, {useEffect, useState} from 'react'
import {todoListAPI, updateTaskType} from "../api/todolosts-api";


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
    const todoListId = "3d939563-7db5-438a-9887-60305941c7cd"
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
    const todoListId = "cf6230d0-e1a8-445b-a75b-6acfb77ee145"
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
    const taskTitle="Task 5"
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
    const todoListId = "2f96a0a7-2c09-4ed8-93a4-bda23d8bc19b"
    const taskId="36a42faa-1d4d-485a-b713-97d8ec01a9b2"
    const task:updateTaskType={
        title: "Таск522222",
        description: "тес5",
        status: 1,
        priority: 5,
        startDate: "null",
        deadline: "null",
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

