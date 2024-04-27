import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore"
import UserReducer from "./user/UserSlice"

const rootReducer = combineReducers({
    user:UserReducer,
    
})

const persitsConfig = {
    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persitsConfig,rootReducer )

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck:false })
})


export const persistor = persistStore(store)