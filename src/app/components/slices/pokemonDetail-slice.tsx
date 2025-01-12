import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  evolutionChain: Pokemon[];
}

const initialState: PokemonDetailsState = {
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
  evolutionChain: [],
};

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonDetailsWithEvolution.fulfilled,
      (
        state,
        action: PayloadAction<{
          pokemonDetails: PokemonDetails;
          evolutionChain: Pokemon[];
        }>,
      ) => {
        state.pokemonDetails = action.payload.pokemonDetails;
        state.evolutionChain = action.payload.evolutionChain;
      },
    );
  },
});

export default pokemonDetailSlice.reducer;

export const fetchPokemonDetailsWithEvolution = createAsyncThunk(
  'pokemon/fetchPokemonDetailsWithEvolution',
  async (pokemonId: string, { rejectWithValue }) => {
    try {
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      const pokemonData = pokemonResponse.data;

      const pokemonDetails: PokemonDetails = {
        id: pokemonData.id.toString(),
        name: pokemonData.name,
        imageSrc: pokemonData.sprites.front_default,
        types: pokemonData.types.map(
          (typeInfo: { type: { name: string } }) => typeInfo.type.name,
        ),
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map(
          (abilityInfo: { ability: { name: string } }) =>
            abilityInfo.ability.name,
        ),
        stats: pokemonData.stats.map(
          (statInfo: { base_stat: number; stat: { name: string } }) => ({
            name: statInfo.stat.name,
            base_stat: statInfo.base_stat,
          }),
        ),
      };

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;

      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionChainId = evolutionChainUrl.split('/').slice(-2, -1)[0];

      const evolutionResponse = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`,
      );
      const evolutionData = evolutionResponse.data;

      const parseEvolutionChain = (chain: any): Pokemon[] => {
        const result: Pokemon[] = [];
        const queue: any[] = [chain];

        while (queue.length > 0) {
          const currentNode = queue.shift();

          const speciesUrl = currentNode.species.url;
          const speciesId = speciesUrl.split('/').slice(-2, -1)[0];

          const pokemon: Pokemon = {
            id: speciesId,
            name: currentNode.species.name,
            imageSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`,
            types: [],
          };

          result.push(pokemon);

          queue.push(...currentNode.evolves_to);
        }

        return result;
      };

      const evolutionChain = parseEvolutionChain(evolutionData.chain);

      return { pokemonDetails, evolutionChain };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data ||
          'Failed to fetch Pokémon details or evolution chain!',
      );
    }
  },
);
