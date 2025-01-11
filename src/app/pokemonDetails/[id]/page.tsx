'use client'
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPokemonById } from "@/app/components/slices/pokemon-slice";
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


const PokemonDetails : React.FC= () =>{
   const { id }= useParams();
   const dispatch = useDispatch<AppDispatch>();
   const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
   const pokemonDetailsState = useSelector((state: RootState) => state.pokemonDetail.pokemonDetails);

   useEffect(()=>{
      dispatch(fetchPokemonById(id as string));
   },[dispatch,id])

   useEffect(() => {
    setPokemonDetails(pokemonDetailsState);
  }, [pokemonDetailsState]);

   return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{pokemonDetails?.name}</h1>
      <Image src={pokemonDetails?.imageSrc as string} width={30} height={30} alt={pokemonDetails?.name as string}/>
      <p><strong>ID:</strong> {pokemonDetails?.id}</p>
      <p><strong>Height:</strong> {pokemonDetails?.height} decimetres</p>
      <p><strong>Weight:</strong> {pokemonDetails?.weight} hectograms</p>
      <p><strong>Types:</strong> {pokemonDetails?.types.join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemonDetails?.abilities.join(', ')}</p>
      <div>
        <h2 className="text-2xl font-semibold mt-4">Stats:</h2>
        <ul>
          {pokemonDetails?.stats.map((stat) => (
            <li key={stat.name}>
              <strong>{stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default PokemonDetails;