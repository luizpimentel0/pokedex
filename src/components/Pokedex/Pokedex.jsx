import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import styles from "./Pokedex.module.scss";
import { PokemonCardSkeleton } from "./components/PokemonCardSkeleton/index";
import { PokemonCard } from "./components/PokemonCard/index";
import { useState } from "react";
import { Modal } from "./components/Modal/index";

const parsePokemonDetail = ({
  id,
  name,
  height,
  weight,
  types,
  abilities,
  sprites,
  stats,
}) => {
  const pokemonTypes = types.map((typeSlot) => typeSlot.type.name);
  const [type] = pokemonTypes;

  const pokemonAbilities = abilities.map((ability) => ability.name);

  const photo = sprites.other.dream_world.front_default;

  return {
    id,
    name,
    number: String(id).padStart("4", "0"),
    height: Number(height / 10),
    weight: Number(weight / 10),
    type,
    types: pokemonTypes,
    abilities: pokemonAbilities,
    photo,
    stats,
  };
};

const getPokemonData = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokemonDetail = await response.json();

  return parsePokemonDetail(pokemonDetail);
};

const fetchPokemons = async (offset = 0, limit = 6) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  const response = await fetch(url);
  const data = await response.json();
  const pokemons = data.results;
  if (!pokemons) return [];

  const pokemonDetails = pokemons.map((pokemon) => getPokemonData(pokemon));

  return Promise.all(pokemonDetails);
};

const PokedexComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    refetchOnWindowFocus: false,
  });

  const showModal = (pokemon) => {
    setModalOpen(true);
    setCurrentPokemon(pokemon);
  };

  if (error) return <div>Error</div>;

  return (
    <>
      <div className={styles["pokedex-container"]}>
        <h1 className={styles["pokedex-container__title"]}>Pokédex</h1>
        <ol className={styles["pokedex-container__cards"]}>
          {data &&
            data.map((pokemon) => (
              <PokemonCard
                id={pokemon.id}
                key={pokemon.id}
                number={pokemon.number}
                name={pokemon.name}
                height={pokemon.height}
                weight={pokemon.weight}
                type={pokemon.type}
                types={pokemon.types}
                abilities={pokemon.abilities}
                photo={pokemon.photo}
                stats={pokemon.stats}
                onClick={() => showModal(pokemon)}
              />
            ))}
        </ol>
        {isLoading && <PokemonCardSkeleton />}
      </div>
      {modalOpen && currentPokemon && (
        <Modal
          {...currentPokemon}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )}
    </>
  );
};

export const Pokedex = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PokedexComponent />
    </QueryClientProvider>
  );
};
