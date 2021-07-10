import { createStore } from 'redux'
//applyMiddleware
import dataReducer from './dataReducer'
// import logger from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(dataReducer, composeWithDevTools(applyMiddleware(logger)))
const store = createStore(dataReducer)

export default store