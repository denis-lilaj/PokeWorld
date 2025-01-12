'use client';

import axios from 'axios';
import Button from 'components/ui/Button';
import SearchFilter from 'components/ui/searchFilter';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemons } from '@/app/components/slices/pokemon-slice';

import { AppDispatch, RootState } from '../reduxStore';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const pokemonsState = useSelector(
    (state: RootState) => state.pokemon.pokemons,
  );

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    setPokemons(pokemonsState);
  }, [pokemonsState]);

  const handleInputValue = async (value: string) => {
    if (value === '') {
      setPokemons(pokemonsState);
      return;
    }

    const response = await axios.get(`/api/pokemons?query=${value}`);
    if (Array.isArray(response.data.data)) {
      setPokemons(response.data.data as Pokemon[]);
    } else {
      setPokemons([]);
    }
  };

  const router = useRouter();
  const handleDetails = (id: string) => {
    router.push(`/pokemonDetails/${id}`);
  };

  const handleGoToTeams = () => {
    router.push('/trainerPage');
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-400 via-yellow-500 to-red-600 text-white'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-center text-primary mb-6'>
          Welcome to the Poké-app
        </h1>

        <div className='flex flex-col justify-center'>
          <div className='mb-6'>
            <SearchFilter handleInputValue={handleInputValue} />
          </div>
          <div className='mb-8 text-center'>
            <h2 className='text-2xl font-semibold text-primary mb-4'>
              Want to check out the teams?
            </h2>
            <div
              onClick={handleGoToTeams}
              className='cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-40 transition-all rounded-lg p-6 max-w-xs mx-auto shadow-lg text-center'
            >
              <h3 className='text-lg font-semibold text-primary'>
                Go to All Teams
              </h3>
              <p className='text-sm font-semibold text-neutral mt-2'>
                Click here to view and manage all your Poké-teams.
              </p>
            </div>
          </div>
        </div>

        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {pokemons.length === 0 ? (
            <li className='col-span-full text-center p-10 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-lg shadow-xl'>
              <p className='text-2xl font-bold mb-4 text-accent'>
                Oops! Failed to catch the Pokémon!
              </p>
              <p className='text-md font-medium text-neutral'>
                Try throwing another Poké-name in the search bar.
              </p>
            </li>
          ) : (
            pokemons.map((pokemon) => (
              <li
                key={pokemon.id}
                className='bg-white bg-opacity-30 hover:bg-opacity-60 transition-all rounded-lg p-4 shadow-lg flex flex-col items-center'
              >
                <Image
                  width={120}
                  height={120}
                  src={pokemon.imageSrc.toString()}
                  alt={pokemon.name}
                  className='rounded-lg mb-4'
                />
                <h3 className='text-xl font-semibold text-primary'>
                  {pokemon.name}
                </h3>
                <p className='text-md font-bold text-neutral'>
                  Types: {pokemon.types.join(', ')}
                </p>
                <Button
                  onClick={() => handleDetails(pokemon.id)}
                  text='Click to view details'
                  className='mt-4 bg-primary text-white font-bold rounded-full transition-all duration-300 hover:bg-secondary hover:text-black px-6 py-3'
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
