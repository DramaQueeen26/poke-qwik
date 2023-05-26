import { Slot, component$, useContextProvider, useStore } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        showBackImage: false,
        isVisible: false,
    });
    
    const pokemonList = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: true,
        pokemons: []
    });

    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    return <Slot />;
});