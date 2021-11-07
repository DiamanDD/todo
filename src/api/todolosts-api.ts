import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8194c176-0220-41f4-bb3a-dc66612b61ce'
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
type GetTaskType = {
    item: TasksType
    totalCount: number
    error: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Competed = 2,
    Draft = 3,

}

const enum TodoTaskPriorites {
    low = 0,
    Middle = 1,
    hi = 2,
    Urgentky = 3,
    later = 4

}

export type TasksType = {
    description: string
    title: string

    status: TaskStatuses
    priority: TodoTaskPriorites
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

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
        return instance.post<ResponsType<TasksType>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})

    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponsType>(`todo-lists/${todoListId}/tasks/${taskId}`,)

    },
    updateTask(todoListId: string, taskId: string, task: any) {
        return instance.put<ResponsType<TasksType>>(`todo-lists/${todoListId}/tasks/${taskId}`, task)

    }

}