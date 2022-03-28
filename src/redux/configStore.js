import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from 'redux-thunk'
import {TipCauculatorReducer} from './Reducer/TipCauculator'
const rootReducer = combineReducers({
    TipCauculatorReducer
});


export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk),
);
