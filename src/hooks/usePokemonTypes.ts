import { useQuery } from '@tanstack/react-query';
import { POKEMON_API } from '../constants';
import { PokemonType } from '../interfaces';

export interface PokemonTypeDetail {
    id: number;
    name: string;
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        };
        slot: number;
    }[];
}

const fetchPokemonTypeDetail = async (url: string) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {}
};

const fetchPokemonTypes = async (): Promise<Array<PokemonType>> => {
    const response = await fetch(`${POKEMON_API}/type`);
    const resp_json = await response.json();
    const data = resp_json.results;
    const promises = data?.map((pokemonType: { url: string }) => fetchPokemonTypeDetail(pokemonType.url));
    const responses: PokemonTypeDetail[] = await Promise.all(promises);
    const newData: PokemonType[] = [];
    responses.forEach((resp) => {
        if (!resp) return;
        newData.push({
            id: resp.id,
            name: resp.name,
            pokemons: resp.pokemon.map((poke) => ({ ...poke.pokemon }))
        });
    });
    return newData;
};

const usePokemonTypes = () => {
    return useQuery({
        queryKey: ['pokemonTypes'],
        queryFn: () => fetchPokemonTypes(),
        refetchOnWindowFocus: false
    });
};

export { usePokemonTypes, fetchPokemonTypes, fetchPokemonTypeDetail };
