import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

interface Team {
  teamId: number;
  name: string;
  pokemons: Pokemon[];
}

interface TrainerState {
  teams: Team[];
  nextTeamId: number;
}

const initialState: TrainerState = {
  teams: [],
  nextTeamId: 1,
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<{ name: string }>) => {
      state.teams.push({
        teamId: state.nextTeamId,
        name: action.payload.name,
        pokemons: [],
      });
      state.nextTeamId += 1;
    },
    removeTeam: (state, action: PayloadAction<number>) => {
      state.teams = state.teams.filter(
        (team) => team.teamId !== action.payload,
      );
    },
    addPokemonToTeam: (
      state,
      action: PayloadAction<{ teamId: number; pokemon: Pokemon }>,
    ) => {
      const team = state.teams.find(
        (team) => team.teamId === action.payload.teamId,
      );
      if (team && team.pokemons.length < 6) {
        const existingPokemon = team.pokemons.find(
          (x) => x.id === action.payload.pokemon.id,
        );
        if (!existingPokemon) {
          team.pokemons.push(action.payload.pokemon);
        }
      }
    },
    removePokemonFromTeam: (
      state,
      action: PayloadAction<{ teamId: number; pokemonId: string }>,
    ) => {
      const team = state.teams.find(
        (team) => team.teamId === action.payload.teamId,
      );
      if (team) {
        team.pokemons = team.pokemons.filter(
          (p) => p.id !== action.payload.pokemonId,
        );
      }
    },
  },
});

export const { addTeam, removeTeam, addPokemonToTeam, removePokemonFromTeam } =
  trainerSlice.actions;

export default trainerSlice.reducer;
