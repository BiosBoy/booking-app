import { applyMiddleware, compose, createStore } from 'redux';

import logger from '../middleware/logger';

import rootReducer from './rootReducer'

import initialState from './initialState';

// creating the root store config
const rootStore = () => {
  const middleware = [logger];

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(rootReducer(), initialState, compose(applyMiddleware(...middleware)))

  return store
}

export default rootStore()
