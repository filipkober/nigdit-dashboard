import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import userSlice from "./userSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

let persistor = persistStore(store);

export { store, persistor };
