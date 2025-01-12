'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonById } from '@/app/components/slices/pokemon-slice';
import { AppDispatch, RootState } from '@/reduxStore';

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

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const pokemonDetailsState = useSelector(
    (state: RootState) => state.pokemonDetail.pokemonDetails,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonById(id as string));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setPokemonDetails(pokemonDetailsState);
  }, [pokemonDetailsState]);

  const handleBackClick = () => {
    router.push('/');
  };

  if (!pokemonDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl font-semibold text-neutral">Loading Poké-details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBackClick}
        className="bg-transparent text-white font-bold px-4 py-2 rounded-lg mt-4 mb-4 border-2 border-white hover:bg-white/20 transition"
      >
        ← Back to Home
      </button>
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          {pokemonDetails.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src={pokemonDetails.imageSrc}
            width={200}
            height={200}
            alt={pokemonDetails.name}
            className="rounded-lg shadow-lg"
          />
          <div className="flex-1 bg-white bg-opacity-30 rounded-lg p-6 shadow-lg text-neutral">
            <p className="text-lg">
              <strong>ID:</strong> {pokemonDetails.id}
            </p>
            <p className="text-lg">
              <strong>Height:</strong> {pokemonDetails.height / 10} m
            </p>
            <p className="text-lg">
              <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
            </p>
            <p className="text-lg">
              <strong>Types:</strong> {pokemonDetails.types.join(', ')}
            </p>
            <p className="text-lg">
              <strong>Abilities:</strong> {pokemonDetails.abilities.join(', ')}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">
            Stats
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemonDetails.stats.map((stat) => (
              <li
                key={stat.name}
                className="bg-white bg-opacity-30 rounded-lg p-4 shadow-md flex flex-col items-center"
              >
                <span className="text-xl font-bold text-accent capitalize">
                  {stat.name}
                </span>
                <span className="text-lg font-semibold text-neutral">
                  {stat.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
