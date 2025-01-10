import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from '@/app/components/slices/pokemon-slice';
import pokemonDetailsReducer from '@/app/components/slices/pokemonDetail-slice'

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonDetails : pokemonDetailsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
