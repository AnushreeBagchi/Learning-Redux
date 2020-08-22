import { createAction,  createReducer, createSlice} from "@reduxjs/toolkit";

// reducer

let lastId = 1;

const slice = createSlice({
    name: "bugs",
    initialState : [],
    reducers : {
        bugAdded :  (bugs, action) => {
            bugs.push ({
                id: lastId++,
                description: action.payload.description,
                resolved: false
            })
        },
        bugResolved :  (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id ===  action.payload.id);
            bugs[index].resolved = true
        },
        bugRemoved : (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id ===  action.payload.id);
            delete bugs[index];
        }
    }
})


export default slice.reducer;
export const {bugAdded, bugRemoved, bugResolved} = slice.actions;