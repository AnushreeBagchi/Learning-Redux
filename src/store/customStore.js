import reducer from "./reducer" ;
export default function createStore(reducer) {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener() );
    }
    const subscribe = (listener) => {
        listeners.push(listener);
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}