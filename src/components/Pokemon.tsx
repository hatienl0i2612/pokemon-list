import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { Pokemon } from '../interfaces';
import Spinner from './Spinner';

type Props = {
    pokemon?: Pokemon;
};

const PokemonDetail = (props: Props) => {
    const { pokemon } = props;
    const { data, isFetching } = usePokemonDetail(pokemon?.url || '', pokemon?.name || '');

    if (isFetching) return <Spinner />;

    return (
        <div>
            <div className='h-24 w-24 mx-auto'>
                <img
                    src={data?.sprites?.other?.['official-artwork']?.front_default || data?.sprites?.other?.home?.front_default}
                    alt={pokemon?.name}
                    title={pokemon?.name}
                    width={100}
                    height={100}
                    loading='lazy'
                />
            </div>
            <div className='text-center'>{pokemon?.name}</div>
        </div>
    );
};

export { PokemonDetail };
