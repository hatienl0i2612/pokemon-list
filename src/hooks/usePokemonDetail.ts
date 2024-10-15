import { useQuery } from '@tanstack/react-query';
import { POKEMON_API } from '../constants';
import { PokemonDetail } from '../interfaces';

const fetchPokemonDetail = async (url: string): Promise<PokemonDetail> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const usePokemonDetail = (url: string, name: string) => {
    return useQuery({
        queryKey: [name],
        queryFn: () => fetchPokemonDetail(url),
        refetchOnWindowFocus: false
    });
};

export { fetchPokemonDetail, usePokemonDetail };
