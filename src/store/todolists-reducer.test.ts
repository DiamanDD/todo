import {v1} from "uuid";
import {selectedfilterType} from "../components/App/AppWithREDUX";
import {
    addTodolostAC, changeTodoListEntytyStatusAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodolostAC, TodoListDomainType,
    todoListReducer
} from "./todolists-reducer";
import {RequestStatusType} from "./app-reducer";
// export let todoList1 = v1()
// export let todolist2 = v1()
let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodoListDomainType>

beforeEach(() => {

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", order: 0, addedDate: "", entytyStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "All", order: 0, addedDate: "", entytyStatus: "idle"}
    ]
})

test("correct todolist should be removed", () => {
    const endState = todoListReducer(startState, removeTodolostAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test("correct todolist should be added", () => {
    let newTodolistTitle = "New Todolist";
    const todolist = {
        id: "123123",
        title: newTodolistTitle,
        addedDate: "dd",
        order: 4,
    }

    const endState = todoListReducer(startState, addTodolostAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";
    const endState = todoListReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test("correct filter of todolist should be changed", () => {
    let newFilter: selectedfilterType = "Completed";
    const endState = todoListReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});

test("correct todolist should change entirety's", () => {
    let newStatus: RequestStatusType = "loading"
    const endState = todoListReducer(startState, changeTodoListEntytyStatusAC(todolistId1, newStatus));
    expect(endState[0].entytyStatus).toBe(newStatus);
    expect(endState[1].entytyStatus).toBe("idle");

});
