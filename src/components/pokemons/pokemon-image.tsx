import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    w?: number;
    h?: number;
    backImage?: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$( ( {id, w = 200, h = 200, backImage = false, isVisible = false}: Props ) => {

    const imageLoader = useSignal<boolean>(false);

    useTask$( ({ track }) => {
        track( () => id ); // * Se ejecutará cada vez que el id cambie
        imageLoader.value = false;
    });

    const imageUrl = useComputed$( () => {

        if( id === '' ) return '';

        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ backImage ? 'back/' : '' }${ id }.png`;
    });

    return (
        <div class="flex items-center justify-center" style={{ width: `${ w }px`, height: `${ h }px` }} >
            { !imageLoader.value && <span>Loading... </span> }
            <img 
                src={ imageUrl.value }
                alt="Pokemon Sprite" 
                width={w}
                height={h}
                onLoad$={ () => {
                    setTimeout( () => {
                        imageLoader.value = true
                    }, 2000 );
                } }
                class={[{
                    'hidden': !imageLoader.value,
                    'brightness-0': !isVisible
                }, 'transition-all']}
            />
        </div>
    );    

});