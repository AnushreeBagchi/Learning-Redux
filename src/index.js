import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";
import * as projectActions from "./store/project";


const store = configureStore();
const unsubscribe = store.subscribe(()=> {
    console.log("Store changed", store.getState());
})
store.dispatch(actions.bugAdded({description : "Bug1"}));
store.dispatch(actions.bugResolved({id : 1}));
unsubscribe();
store.dispatch(actions.bugRemoved({id : 1}))
console.log(store.getState());


// console.log(projectActions);
store.dispatch(projectActions.add({description : "project1"}));
// store.dispatch(projectActions.complete({id : 1}));
// unsubscribe();
// store.dispatch(projectActions.remove({id : 1}))
console.log(store.getState());
