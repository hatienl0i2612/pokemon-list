import { useQuery } from '@tanstack/react-query';
import { POKEMON_API, POKEMON_LIMIT } from '../constants';
import { Pokemon } from '../interfaces';

const fetchPokemons = async (limit: number): Promise<Array<Pokemon>> => {
    const response = await fetch(POKEMON_API + `/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
};

const usePokemons = (limit: number = POKEMON_LIMIT) => {
    return useQuery({
        queryKey: ['pokemons'],
        queryFn: () => fetchPokemons(limit),
        refetchOnWindowFocus: false
    });
};

export { usePokemons, fetchPokemons };
