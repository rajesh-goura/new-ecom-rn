import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import userReducer from './slices/usersSlice';
import productReducer from './slices/productSlice';
import themeReducer from './slices/themeSlice';
import resetMiddleware from './slices/resetMiddleware';

const secureStorage = createSecureStore();

const authPersistConfig = {
  key: 'auth',
  storage: secureStorage,
  whitelist: ['token'],
};

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
  whitelist: ['theme'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  products: productReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(resetMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;