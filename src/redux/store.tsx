import { configureStore, combineReducers } from "@reduxjs/toolkit";
import shopperReducer from "./shopperSlice";
import popupReducer from "./popupSlice";
import footerReducer from "./footerSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import navbarSlice from "./navbarSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  shopper: shopperReducer,
  popup: popupReducer,
  footer: footerReducer,
  navbar: navbarSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,'footer/fetchData/fulfilled'],
        ignoredPaths: ['footer.footerGroups.createdAt', 'footer.socialLinks.date'], // Ignore specific state paths
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;