import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchPokemonById } from "@/app/components/slices/pokemon-slice";

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

interface PokemonDetails extends Pokemon {
  height: number;                 
  weight: number;                 
  abilities: string[];            
  stats: {
    name: string;                 
    base_stat: number;            
  }[];
}

interface PokemonDetailsState {
  pokemonDetails: PokemonDetails;
}

const initialState : PokemonDetailsState = {
  pokemonDetails: {
    id: '',                   
    name: '',                 
    imageSrc: '',              
    types: [],                 
    height: 0,                 
    weight: 0,                 
    abilities: [],             
    stats: [],                 
  },
}

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchPokemonById.fulfilled,
      (state, action: PayloadAction<PokemonDetails>) => {
        state.pokemonDetails = action.payload; 
      }
    )
  }
})

export default pokemonDetailSlice.reducer;


