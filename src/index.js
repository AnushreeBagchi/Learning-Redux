import configureStore from "./store/configureStore";
import {loadBugs} from "./store/bugs"
const store = configureStore();

// UI layer

store.dispatch(loadBugs());
