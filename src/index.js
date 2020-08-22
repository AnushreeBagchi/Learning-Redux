import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugRemoved,
  getUnresolvedBugs,
  bugsAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import { add, remove, complete } from "./store/project";
import { userAdded } from "./store/users";

const store = configureStore();
const unsubscribe = store.subscribe(()=> {
    console.log("Store changed", store.getState());
})
store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugAdded({ description: "Bug3" }));
store.dispatch(bugResolved({ id: 1 }));
const unresolved = getUnresolvedBugs(store.getState());

// adding teams

store.dispatch(userAdded({ name: "John" }));
store.dispatch(userAdded({ name: "Jane" }));
store.dispatch(userAdded({ name: "George" }));

store.dispatch(bugsAssignedToUser({ bugId: 1, userId: 1 }));
const bugsAssignedToUser1 = getBugsByUser(1)(store.getState());
console.log(bugsAssignedToUser1);

//adding project
store.dispatch(add({ description: "project1" }));
store.dispatch(add({ description: "project2" }));
store.dispatch(add({ description: "project3" }));

store.dispatch(complete({ id: 1 }));
// unsubscribe();
// store.dispatch(remove({id : 1}))

