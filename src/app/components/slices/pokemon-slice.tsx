import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
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
      const data = response.data;

      const pokemonDetails = {
        id: data.id.toString(),
        name: data.name,
        imageSrc: data.sprites.front_default,
        types: data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(
          (abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name
        ),
        stats: data.stats.map((statInfo: { base_stat: number; stat: { name: string } }) => ({
          name: statInfo.stat.name,
          base_stat: statInfo.base_stat,
        })),
      };

      return pokemonDetails;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Pokémon');
    }
  },
);

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`,
      );

      const pokemons = await Promise.all(
        response.data.results.map(async ({ url }: { url: string }) => {
          const { data } = await axios.get(url);

          return {
            id: data.id,
            name: data.name,
            imageSrc: data.sprites.front_default,
            types: data.types.map((typeInfo: any) => typeInfo.type.name),
          };
        }),
      );

      return pokemons;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Pokémon');
    }
  },
);

