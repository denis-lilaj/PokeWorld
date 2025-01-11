'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '@/app/components/slices/pokemon-slice';
import {
  addPokemonToTeam,
  removePokemonFromTeam,
} from '@/app/components/slices/trainer-slice';
import { AppDispatch, RootState } from '@/reduxStore';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

const TrainerPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) =>
    state.trainer.teams.find((team) => team.teamId === Number(id)),
  );

  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  useEffect(() => {
    if (!team) {
      router.push('/trainerPage');
    }
  }, [team, router]);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const handleAddPokemon = (pokemon: Pokemon) => {
    if (team && team.pokemons.length < 6) {
      dispatch(addPokemonToTeam({ teamId: Number(id), pokemon }));
    }
  };

  const handleRemovePokemon = (pokemonId: string) => {
    dispatch(removePokemonFromTeam({ teamId: Number(id), pokemonId }));
  };

  if (!team) return null;

  return (
    <div>
      <h1>Manage Team: {team.name}</h1>

      <div>
        <h2>Your Team</h2>
        {team.pokemons.length === 0 ? (
          <p>No Pokémon in this team</p>
        ) : (
          <ul>
            {team.pokemons.map((p) => (
              <li key={p.id}>
                {p.name} (ID: {p.id})
                <button onClick={() => handleRemovePokemon(p.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Available Pokémon</h2>
        <div>
          {pokemons.map((pokemon) => (
            <div key={pokemon.id}>
              <Image
                src={pokemon.imageSrc}
                alt={pokemon.name}
                width={30}
                height={30}
              />
              <h3>{pokemon.name}</h3>
              <p>Types: {pokemon.types.join(', ')}</p>
              <button onClick={() => handleAddPokemon(pokemon)}>
                Add to Team
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerPage;
