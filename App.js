import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
  auth: authReducer
  //other reducers
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

