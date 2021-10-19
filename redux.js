function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState() {
            return {...state};
        },
        dispatch(action){
            const nextState = reducer(action, state);
            if(nextState !== state) {

                state = nextState;
                listeners.forEach( l => l());
            }
        },
        subscribe(listener) {
            const length = listeners.push(listener);
            return () => listeners.splice(length - 1, 1);
        }
    }
}

function counter(action, state = {count: 0}) {
    switch (action.type) {
        case 'UP':
            return {
                ...state,
                count: state.count + 1,
            }
            break;
        case 'DOWN':
            return {
                ...state,
                count: state.count - 1,
            }
            break;
        default:
            return state;
    }

}

const store = createStore(counter);
const one = store.subscribe(() => {
    console.log('1', store.getState())
});

const two = store.subscribe(() => {
    console.log('2', store.getState())
});
store.dispatch({type: 'UP'});

console.log(store.getState())

one();

store.dispatch({type: 'UP'});
console.log(store.getState())
