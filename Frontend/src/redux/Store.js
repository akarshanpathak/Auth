import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'
import { version } from 'mongoose'
import {persistStore} from 'redux-persist'
const persistConfig={
   key:'root',
   version:1,
   storage
}

const reducer=combineReducers({
    user:userReducer
})

const persistRed=persistReducer(persistConfig,reducer)
const store = configureStore({
    reducer: persistRed,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

export const persistor=persistStore(store)
export default store
 