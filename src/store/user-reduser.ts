type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: "INCREMENT-CHILDREN-COUNT" |'INCREMENT-AGE'| 'CHANGE-NAME'
    [key: string]: any
    newName?:string
}

export const userReducer = (state: StateType, action: ActionType):StateType => {

    switch (action.type) {
        case "INCREMENT-AGE":
            return {
                ...state,
                age: state.age + 1
            }
        case "INCREMENT-CHILDREN-COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case "CHANGE-NAME":
            if(action.newName){
                return { ...state,
                    name:action.newName
                }
            }
            else{
                  throw new Error("I don't understand this name")
            }

        default:
            throw new Error("I don't understand this type")
    }
}
