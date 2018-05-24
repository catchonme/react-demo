import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

function count(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'REDUCER':
            return state - 1;
        default :
            return state;
    }
}

const store = createStore(count, applyMiddleware(thunk));

function add() {
    return {
        type: 'ADD'
    }
}

function reducer() {
    return {
        type: 'REDUCER'
    }
}

function addIfOdd() {
    return (dispatch, getState) => {
        const currentValue = getState();
        if (currentValue % 2 === 0) {
            return false;
        }
        dispatch(add())
    }
}

function addAsy(delay = 2000) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(add())
        }, delay)
    }
}

let currentValue = store.getState();
store.subscribe(() => {
    const previousValue = currentValue;
    currentValue = store.getState();
    console.log('上一个值：', previousValue, '当前值：', currentValue)
})

store.dispatch(add());
store.dispatch(add());
store.dispatch(add());
store.dispatch(add());
store.dispatch(reducer());
store.dispatch(addIfOdd());
store.dispatch(addAsy());