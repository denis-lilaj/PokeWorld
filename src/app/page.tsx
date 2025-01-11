'use client';
import axios from 'axios';
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
  const pokemonsState = useSelector((state: RootState) => state.pokemon.pokemons);

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
  };
};

const router=useRouter();
const handleDetails=(id: string)=>{
  router.push(`/pokemonDetails/${id}`)
}

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchFilter handleInputValue={handleInputValue} />
      <ul>
        {pokemons &&
          pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              {pokemon.name}
              <Image
                width={50}
                height={50}
                src={pokemon.imageSrc.toString()}
                alt={pokemon.name}
              />
              Types: {pokemon.types.join(', ')} <br></br>
              <button onClick={()=>handleDetails(pokemon.id)}>Click to view the details</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
