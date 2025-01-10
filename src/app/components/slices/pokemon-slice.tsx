import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  type: string;
}

interface PokemonState {
  pokemons: Pokemon[];
}

const initialState: PokemonState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPokemonById.fulfilled,
        (state, action: PayloadAction<Pokemon>) => {
          const existingIndex = state.pokemons.findIndex(
            (x) => x.id === action.payload.id,
          );
          if (existingIndex === -1) {
            state.pokemons.push(action.payload);
          }
        },
      )
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.pokemons = action.payload;
        },
      )
  },
});

export default pokemonSlice.reducer;

//Thunks for pokemon slice (CRUD)
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchById',
  async (pokemonId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Pokémon');
    }
  },
);

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Pokémon');
    }
  },
);

