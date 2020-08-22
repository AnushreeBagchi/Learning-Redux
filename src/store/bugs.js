import { createSlice} from "@reduxjs/toolkit";
import { createSelector } from "reselect";

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
        },
        bugsAssignedToUser: (bugs, action) => {
            const {bugId, userId} = action.payload;
            const index = bugs.findIndex(bug => bug.id ===  bugId);
            bugs[index].userId = userId;
        }
    }
})


export default slice.reducer;
export const {bugAdded, bugRemoved, bugResolved, bugsAssignedToUser} = slice.actions;

// export const getUnresolvedBugs = (state) => {
//     return  state.entities.bugs.filter(bug => !bug.resolved );
// }

export const getUnresolvedBugs = createSelector (
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved )
)

export const getBugsByUser = userId => createSelector (
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)