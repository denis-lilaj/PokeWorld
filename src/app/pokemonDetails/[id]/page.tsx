'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemonDetailsWithEvolution } from '@/app/components/slices/pokemonDetail-slice';
import { AppDispatch, RootState } from '@/reduxStore';

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const pokemonDetails = useSelector(
    (state: RootState) => state.pokemonDetail.pokemonDetails,
  );
  const evolutionChain = useSelector(
    (state: RootState) => state.pokemonDetail.evolutionChain,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonDetailsWithEvolution(id as string));
    }
  }, [dispatch, id]);

  const handleBackClick = () => {
    router.push('/');
  };

  if (!pokemonDetails || !pokemonDetails.id) {
    return (
      <div className='min-h-screen flex items-center justify-center text-center'>
        <p className='text-xl font-semibold text-neutral'>
          Loading Poké-details...
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <button
          onClick={handleBackClick}
          className='bg-transparent text-white font-bold px-4 py-2 rounded-lg mt-4 mb-4 border-2 border-white hover:bg-white/20 transition'
        >
          ← Back to Home
        </button>
        <h1 className='text-4xl font-bold text-center text-primary mb-6'>
          {pokemonDetails.name}
        </h1>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <Image
            src={pokemonDetails.imageSrc}
            width={200}
            height={200}
            alt={pokemonDetails.name}
            className='rounded-lg shadow-lg'
          />
          <div className='flex-1 bg-white bg-opacity-30 rounded-lg p-6 shadow-lg text-neutral'>
            <p className='text-lg'>
              <strong>ID:</strong> {pokemonDetails.id}
            </p>
            <p className='text-lg'>
              <strong>Height:</strong> {pokemonDetails.height / 10} m
            </p>
            <p className='text-lg'>
              <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
            </p>
            <p className='text-lg'>
              <strong>Types:</strong> {pokemonDetails.types.join(', ')}
            </p>
            <p className='text-lg'>
              <strong>Abilities:</strong> {pokemonDetails.abilities.join(', ')}
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <h2 className='text-2xl font-bold text-center text-primary mb-4'>
            Stats
          </h2>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pokemonDetails.stats.map((stat) => (
              <li
                key={stat.name}
                className='bg-white bg-opacity-30 rounded-lg p-4 shadow-md flex flex-col items-center'
              >
                <span className='text-xl font-bold text-accent capitalize'>
                  {stat.name}
                </span>
                <span className='text-lg font-semibold text-neutral'>
                  {stat.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {evolutionChain.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-2xl font-bold text-center text-primary mb-4'>
              Evolution Chain
            </h2>
            <div className='flex justify-center gap-8 flex-wrap'>
              {evolutionChain.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className='flex flex-col font-bold items-center text-center bg-white bg-opacity-30 rounded-lg p-4 shadow-md'
                >
                  <Image
                    src={pokemon.imageSrc}
                    width={100}
                    height={100}
                    alt={pokemon.name}
                    className='rounded-lg'
                  />
                  <p className='text-lg font-bold text-accent capitalize mt-2'>
                    {pokemon.name}
                  </p>
                  <p className='text-sm text-neutral'>ID: {pokemon.id}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;
