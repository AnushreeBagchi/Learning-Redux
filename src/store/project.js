import {createSlice} from "@reduxjs/toolkit";

let lastid = 0;
const slice = createSlice({
    name: "projects",
    initialState : [],
    reducers : {
        add : (projects, action) => {
            projects.push({
                id: ++lastid,
                description : action.payload.description,
                completed : false
            })
        },
        remove : (projects, action) => {
            const index =  projects.findIndex(p => p.id === action.payload.id);
            delete projects[index];
        },
        complete : (projects, action) => {
            const index =  projects.findIndex(p => p.id === action.payload.id);
            projects[index].completed = true
        }
    }
});

// const projectsReducer = slice.reducer
export default slice.reducer;
export const {add, remove, complete} = slice.actions;