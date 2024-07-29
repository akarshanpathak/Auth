import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/Store.js'
import {PersistGate} from "redux-persist/integration/react"
import {persistor} from './redux/Store.js'
import { UserContextProvider } from './context/UserContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <Provider store={store}>
   <PersistGate persistor={persistor}>
    <SocketContextProvider>
    <App />
   </SocketContextProvider>
   </PersistGate>
    </Provider>
    </UserContextProvider>
  </React.StrictMode>
)
