import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
// reducer

let lastId = 1;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: lastId++,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      delete bugs.list[index];
    },
    bugsAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
  },
});

export default slice.reducer;
export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugsAssignedToUser,
  bugsReceived,
  bugsRequested,
} = slice.actions;

//action creator
export const loadBugs = () =>
  apiCallBegan({
    url: "/bugs",
    onStart : bugsRequested.type,
    onSuccess: slice.actions.bugsReceived.type,
  });

// export const getUnresolvedBugs.list = (state) => {
//     return  state.entities.bugs.list.filter(bug => !bug.resolved );
// }

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs.list,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );
