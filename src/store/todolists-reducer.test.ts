import {v1} from "uuid";
import {selectedfilterType, todoListType} from "../AppWithREDUX";
import {
    addTodolostAC,
    changeTodolistFilterAC,
    changeTodoListTitleAC,
    removeTodolostAC,
    todoListReducer
} from "./todolists-reducer";


test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = todoListReducer(startState, removeTodolostAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, addTodolostAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test("correct todolist should change its name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = todoListReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test("correct filter of todolist should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: selectedfilterType = "Completed";
    const startState: Array<todoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = todoListReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
