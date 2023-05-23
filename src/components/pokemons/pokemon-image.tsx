import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number,
    w?: number,
    h?: number,
    backImage?: boolean,
}

export const PokemonImage = component$( ( {id, w = 200, h = 200, backImage = false}: Props ) => {

    const imageLoader = useSignal<boolean>(false);

    useTask$( ({ track }) => {
        track( () => id ); // * Se ejecutará cada vez que el id cambie
        imageLoader.value = false;
    })

    return (
        <div class="flex items-center justify-center">
            <span style={{width: w, height: h}} class={{
                'hidden': imageLoader.value
            }}>Loading...</span>
            <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ backImage ? 'back/' : '' }${ id }.png`}
                alt="Pokemon Sprite" 
                width={w}
                height={h}
                onLoad$={ () => {
                    setTimeout( () => {
                        imageLoader.value = true
                    }, 2000 );
                } }
                class={{
                    'hidden': !imageLoader.value
                }}
            />
        </div>
    );    

});