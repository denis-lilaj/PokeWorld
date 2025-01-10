'use client';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPokemons } from '@/app/components/slices/pokemon-slice';
import { AppDispatch, RootState } from '../reduxStore';
import { useEffect } from 'react';
import Image from 'next/image';
import SearchFilter from 'components/ui/searchFilter';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  console.log(pokemons);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchFilter onChange={handleChange} />
      <ul>
        {pokemons &&
          pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              {pokemon.name}
              <Image
                width={50}
                height={50}
                src={pokemon.imageSrc.toString()}
                alt={'margaritar'}
              />
              Types: {pokemon.types.join(', ')}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
