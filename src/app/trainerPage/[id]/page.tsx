'use client';

import Button from 'components/ui/Button';
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

  const handleBackClick = () => {
    router.push('/trainerPage');
  };

  if (!team) return null;

  const availablePokemons = pokemons.filter(
    (pokemon) => !team.pokemons.some((p) => p.id === pokemon.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBackClick}
        className="bg-transparent text-white font-bold px-4 py-2 rounded-lg mt-4 mb-4 border-2 border-white hover:bg-white/20 transition"
      >
        ← Back to All Teams
      </button>
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          Manage Team: {team.name}
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Your Team</h2>
          {team.pokemons.length === 0 ? (
            <p>No Pokémon in this team</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.pokemons.map((p) => (
                <li
                  key={p.id}
                  className="bg-white bg-opacity-30 hover:bg-opacity-60 transition-all rounded-lg p-4 shadow-lg flex flex-col items-center"
                >
                  <Image
                    src={p.imageSrc}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-primary">{p.name}</h3>
                  <p className="text-md font-bold text-neutral">
                    Types: {p.types.join(', ')}
                  </p>
                  <Button className="px-4 py-2 mt-4" onClick={() => handleRemovePokemon(p.id)} text="Remove" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Available Pokémon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-white bg-opacity-30 hover:bg-opacity-60 transition-all rounded-lg p-4 shadow-lg flex flex-col items-center"
              >
                <Image
                  src={pokemon.imageSrc}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-primary">{pokemon.name}</h3>
                <p className="text-md font-bold text-neutral">
                  Types: {pokemon.types.join(', ')}
                </p>
                <Button className="px-4 py-2 mt-4" onClick={() => handleAddPokemon(pokemon)} text="Add to Team" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerPage;
