export interface PokemonType {
    name: string;
    id: string | number;
    pokemons: Pokemon[];
}

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetail {
    sprites: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
            home: {
                front_default: string;
            };
        };
    };
}
