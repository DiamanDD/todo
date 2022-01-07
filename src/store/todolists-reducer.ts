import {selectedfilterType} from "../components/App/AppWithREDUX";
import {todoListAPI, TodoListsType} from "../api/todolosts-api";
import {RequestStatusType, setStatusMessageAC} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TodoListDomainType = TodoListsType & {
    filter: selectedfilterType
    entytyStatus: RequestStatusType
}

const InitialState: Array<TodoListDomainType> = []

export const fetchTodolistThunk = createAsyncThunk("todolist/fetchTodoList", async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    const res = await todoListAPI.getTodoLists()
    try {
        dispatch(setStatusMessageAC({status: "succeeded"}))
        return {TodoList: res.data}
    } catch (error) {
        return rejectWithValue(null)
    }
})
export const addTodoListTC = createAsyncThunk("todolist/addTodolist", async (param: { newTitle: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    const res = await todoListAPI.createTodolist(param.newTitle)
    try {
        dispatch(setStatusMessageAC({status: "succeeded"}))
        return {todolist: res.data.data.item}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const removeTodoListTC = createAsyncThunk("todolist/removeTodoList", async (param: { todolistId1: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    const res = await todoListAPI.deleteTodoList(param.todolistId1)
    try {
        dispatch(setStatusMessageAC({status: "succeeded"}))
        return {todolistId1: param.todolistId1}
    } catch (error) {
        return rejectWithValue(null)
    }
})

export const changeTodolistTC = createAsyncThunk("todolist/changeTodolist", async (param: { todolistId2: string, newTodolistTitle: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusMessageAC({status: "loading"}))
    const res = await todoListAPI.updateTodoList(param.todolistId2, param.newTodolistTitle)
    try {
        dispatch(setStatusMessageAC({status: "succeeded"}))
        return {todolistId2: param.todolistId2, newTodolistTitle: param.newTodolistTitle}
    } catch (error) {
        return rejectWithValue(null)
    } finally {
        dispatch(setStatusMessageAC({status: "succeeded"}))
    }
})


const slice = createSlice({
    name: 'todolists',
    initialState: InitialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId2: string, newFilter: selectedfilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId2)
            state[index].filter = action.payload.newFilter
        },
        changeTodoListEntytyStatusAC(state, action: PayloadAction<{ todolistId2: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId2)
            state[index].entytyStatus = action.payload.status
        }

    },
    extraReducers: (buider) => {
        buider.addCase(fetchTodolistThunk.fulfilled, (state, action) => {
            return action.payload.TodoList.map((tl) => ({...tl, filter: "All", entytyStatus: "idle"}))
        })
        buider.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "All", entytyStatus: "idle"})

        })
        buider.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId1)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        buider.addCase(changeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId2);
            state[index].title = action.payload.newTodolistTitle
        })
    }
})

export const todoListReducer = slice.reducer

export const {
    changeTodolistFilterAC
    , changeTodoListEntytyStatusAC

} = slice.actions




