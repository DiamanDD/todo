import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a3125516-298a-4c0c-be52-f33be15661ba'
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})
export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponsType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}
export type GetTaskType = {
    items: TasksDomainType[]
    totalCount: number
    error: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Competed = 2,
    Draft = 3,
}
export const enum TodoTaskPriorites {
    low = 0,
    Middle = 1,
    hi = 2,
    Urgentky = 3,
    later = 4,
    max
}
export type TasksDomainType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorites
    startDate: string |null
    deadline: string |null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type updateTaskType={
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorites
    startDate: string | null
    deadline: string |null
}


export const todoListAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListsType>>("todo-lists")
    },
    createTodolist(newTitle: string) {
        return instance.post<ResponsType<{ item: TodoListsType }>>("todo-lists", {title: newTitle})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete <ResponsType>(`todo-lists/${todoListId}`, settings)
    },
    updateTodoList(todoListId: string, newTitle: string) {
        return instance.put<ResponsType>(
            `todo-lists/${todoListId}`,
            {title: newTitle},
            settings)
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponsType<{item:TasksDomainType}>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponsType>(`todo-lists/${todoListId}/tasks/${taskId}`,)
    },
    updateTask(todoListId: string, taskId: string, task: updateTaskType) {
        return instance.put<ResponsType<TasksDomainType>>(`todo-lists/${todoListId}/tasks/${taskId}`, task)
    }
}