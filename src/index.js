import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Provider} from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import {persistStore,persistReducer} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import indexReducer from "./store/reducer/index";

 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, indexReducer)

let store = createStore(persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const persistor = persistStore(store);

ReactDOM.render(
  // we need to make the store available to our app. 
  // To do this, we wrap our app with the <Provider /> 
  // API provided by React Redux. store is passed in as a prop
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();