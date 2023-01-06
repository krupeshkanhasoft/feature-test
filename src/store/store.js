import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"

import contactReducer from './reducers/contactList';

const composeEnhancers = null || compose;
const rootReducer = combineReducers({
  contactReducer: contactReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk))
);

export default store