import {createSlice} from "@reduxjs/toolkit";
import entities from "./entities";
import {createSelector} from "reselect";

let lastid = 0;
const slice = createSlice({
    name: "users",
    initialState : [],
    reducers : {
        userAdded : (teams, action) => {
            teams.push({
                id: ++lastid,
                name : action.payload.name
            })
        }
    }
});

export default slice.reducer;
export const {userAdded} = slice.actions;

export const assignBug = createSelector (
    state => state.entities.bugs,

);