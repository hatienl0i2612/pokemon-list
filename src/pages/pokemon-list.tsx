import React, { useEffect, useMemo, useState } from 'react';
import { PokemonDetail } from '../components';
import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { usePokemons } from '../hooks/usePokemons';
import Spinner from '../components/Spinner';
import { Pokemon, PokemonType } from '../interfaces';
import { DEFAULT_PAGINATION } from '../constants';

const Home = () => {
    const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);

    const [pagination, setPagination] = useState({
        pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
        pageSize: DEFAULT_PAGINATION.PAGE_SIZE
    });

    const { data: dataPokemonTypes, isFetching: isFetchingTypes } = usePokemonTypes();

    const { data: pokemons, isFetching: isFetchingPokemons } = usePokemons();

    const [data, setData] = useState<Pokemon[]>([]);

    useEffect(() => {
        if (!selectedTypes.length) {
            setData(pokemons || []);
        } else {
            const selectedPokemon: Pokemon[][] = [];
            dataPokemonTypes?.forEach((dataSelectedType) => {
                if (selectedTypes.some((type) => type.name === dataSelectedType.name)) {
                    selectedPokemon.push(dataSelectedType.pokemons);
                }
            });
            const duplicatesInAll = selectedPokemon[0].filter((value) => selectedPokemon.every((arr) => arr.some((a) => a.name === value.name)));
            setData(duplicatesInAll);
        }
    }, [pokemons, selectedTypes]);

    const onClickType = (pokemonType: PokemonType) => {
        if (selectedTypes.some((type) => type.name === pokemonType.name)) {
            setSelectedTypes(selectedTypes.filter((type) => type.name !== pokemonType.name));
        } else {
            setSelectedTypes([...selectedTypes, pokemonType]);
        }
        setPagination({
            ...pagination,
            pageIndex: 0
        });
    };

    const pokemonsData = useMemo(() => {
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return data?.filter((pokemon, idx) => idx >= start && idx < end);
    }, [pagination, data]);

    if (isFetchingTypes || isFetchingPokemons) return <Spinner />;

    return (
        <div>
            <div className='mx-auto max-w-screen-xl'>
                <div className='flex items-center mx-4 my-4'>
                    <div className='mr-2 my-4 font-bold self-start'>Types:</div>
                    <div>
                        {dataPokemonTypes?.map((pokemonType) => (
                            <button
                                key={pokemonType.name}
                                className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold ${
                                    selectedTypes.some((type) => type.name === pokemonType.name) ? 'text-white bg-red-900' : 'text-red-900'
                                }`}
                                onClick={() => onClickType(pokemonType)}
                            >
                                {pokemonType.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='my-12 mx-4 font-bold'>{data?.length} results found.</div>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                {pokemonsData?.map((pokemon, idx) => (
                    <PokemonDetail key={pokemon.name + idx} pokemon={pokemon} />
                ))}
            </div>
            <div className='mt-8 flex justify-center'>
                <button
                    className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
                    disabled={pagination.pageIndex === 0}
                    onClick={() => {
                        setPagination({
                            ...pagination,
                            pageIndex: pagination.pageIndex - 1
                        });
                    }}
                >
                    Prev
                </button>
                <button
                    className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
                    disabled={pagination.pageIndex * pagination.pageSize + pagination.pageSize >= (data?.length || 0)}
                    onClick={() => {
                        setPagination({
                            ...pagination,
                            pageIndex: pagination.pageIndex + 1
                        });
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
