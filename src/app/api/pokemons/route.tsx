import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface Pokemon {
  id: string;
  name: string;
  imageSrc: string;
  types: string[];
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
    const results = response.data.results;

    let pokemons: Pokemon[] = await Promise.all(
      results.map(async (pokemon: { name: string; url: string }) => {
        const details = await axios.get(pokemon.url);
        const data = details.data;
        return {
          id: data.id,
          name: data.name,
          imageSrc: data.sprites.front_default,
          types: data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
        };
      })
    );

    if (query) {
      const searchQuery = query.toLowerCase();
      pokemons = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery) ||
          pokemon.id.toString() === searchQuery
      );
    }

    return NextResponse.json({ status: 'success', data: pokemons });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching Pokémon:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch Pokémon' },
      { status: 500 }
    );
  }
}
