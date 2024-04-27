import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import './index.css'
import { store, persistor } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
   <PersistGate persistor={persistor}>
    <Provider store={store}>
    <App />
    </Provider>
   </PersistGate>
    </BrowserRouter>
 
)
