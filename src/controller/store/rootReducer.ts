import { combineReducers } from 'redux'

import app from '../reducers'

const makeRootReducer = () => combineReducers({
    app
})

export default makeRootReducer
