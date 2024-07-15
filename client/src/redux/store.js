import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 


// copy from documentation & adjust (redux-persist)
const rootReducer = combineReducers({user: userReducer})
 
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// redux persist end

export const store = configureStore({
  reducer: 
    persistedReducer,        // user: userReducer (replaced to use redux-persist)
   
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)