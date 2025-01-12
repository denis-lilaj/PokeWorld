import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import pokemonReducer from '@/app/components/slices/pokemon-slice';
import pokemonDetailsReducer from '@/app/components/slices/pokemonDetail-slice';
import trainerReducer from '@/app/components/slices/trainer-slice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedTrainerReducer = persistReducer(persistConfig, trainerReducer);

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonDetail: pokemonDetailsReducer,
    trainer: persistedTrainerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
