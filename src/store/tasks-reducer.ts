import {addTodoListTC, changeTodoListEntytyStatusAC, fetchTodolistThunk, removeTodoListTC} from "./todolists-reducer";
import {TasksDomainType, TaskStatuses, todoListAPI, TodoTaskPriorites, updateTaskType} from "../api/todolosts-api";
import {AppStateType} from "./root-redicer";
import {setStatusMessageAC} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utilits/apperror-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export type TascsStateType = {
    [key: string]: Array<TasksDomainType>
}
type updTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorites
    startDate?: string | null
    deadline?: string | null
}
const InitialState: TascsStateType = {}

export const fetchTasksTC = createAsyncThunk("tasks/settasks", async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    const res = await todoListAPI.getTasks(param.todolistId)
    try {
        dispatch(setStatusMessageAC({status: "idle"}))
        return {tasks: res.data.items, todolistId: param.todolistId}
    } catch (error) {
        return rejectWithValue(null)
    }
})
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { title: string, todolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    dispatch(changeTodoListEntytyStatusAC({status: "loading", todolistId2: param.todolistID}))
    const res = await todoListAPI.createTask(param.todolistID, param.title)
    try {
        if (res.data.resultCode === 0) {
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
        }
        return rejectWithValue(null)
    } catch (error: any) {
        handleNetworkAppError(error.message, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setStatusMessageAC({status: "succeeded"}))
        dispatch(changeTodoListEntytyStatusAC({status: "succeeded", todolistId2: param.todolistID}))
    }
})
export const selectedfilterTC = createAsyncThunk("tasks/selectedFilter", async (param: { id: string, todolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    dispatch(changeTodoListEntytyStatusAC({status: "loading", todolistId2: param.todolistID}))
    const res = await todoListAPI.deleteTask( param.todolistID,param.id, )
    try {
        if (res.data.resultCode === 0) {
          return{id: param.id, todolistID: param.todolistID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error:any) {
        handleNetworkAppError(error.message, dispatch)
        return rejectWithValue(null)
    }
    finally{
        dispatch(setStatusMessageAC({status: "succeeded"}))
        dispatch(changeTodoListEntytyStatusAC({status: "succeeded", todolistId2: param.todolistID}))
    }
})

export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { id: string, updTaskModel: updTaskModelType, todolistID: string }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const state = getState() as AppStateType
    const oldTAsk = state.tasksReducer[param.todolistID].find(tl => tl.id === param.id)
    if (!oldTAsk) {
        return rejectWithValue(null)
    }
    const task: updateTaskType = {
        description: oldTAsk.description,
        title: oldTAsk.title,
        status: oldTAsk.status,
        priority: oldTAsk.priority,
        startDate: oldTAsk.startDate,
        deadline: oldTAsk.deadline,
        ...param.updTaskModel
    }
    const res = await todoListAPI.updateTask(param.todolistID, param.id, task)
    try {
        if (res.data.resultCode === 0) {
          return  {updTaskModel: param.updTaskModel, id: param.id, todolistID: param.todolistID}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleNetworkAppError(error.message, dispatch)
        return rejectWithValue(null)
    }
})
const slice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistThunk.fulfilled, (state, action) => {
            action.payload.TodoList.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId1]
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId] = [action.payload.task,
                ...state[action.payload.task.todoListId]]
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistID] = state[action.payload.todolistID].map(t => (t.id === action.payload.id ? {
                ...t,
                ...action.payload.updTaskModel
            } : t))
        })
        builder.addCase(selectedfilterTC.fulfilled,(state,action)=>{
            state[action.payload.todolistID] = state[action.payload.todolistID].filter(t => (t.id !== action.payload.id))
        })
    }
})
export const tasksReducer = slice.reducer







