import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import styles from "./Pokedex.module.scss";
import { PokemonCardSkeleton } from "./components/PokemonCardSkeleton/index";
import { PokemonCard } from "./components/PokemonCard/index";
import { useCallback, useMemo, useState, useRef } from "react";
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

const POKEMONS_PER_PAGE = 6;

const fetchPokemons = async ({ pageParam }) => {
  const offset = pageParam ? pageParam : 0;
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${POKEMONS_PER_PAGE}`;

  const response = await fetch(url);
  const data = await response.json();
  const pokemons = data.results;
  if (!pokemons) return [];

  const pokemonDetails = await Promise.all(
    pokemons.map((pokemon) => getPokemonData(pokemon)),
  );

  return { data: pokemonDetails, offset: offset + POKEMONS_PER_PAGE };
};

const PokedexComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: ({ pageParam }) => fetchPokemons({ pageParam }),
      getNextPageParam: (lastPage, pages) => lastPage.offset,
      refetchOnWindowFocus: false,
    });

  const handleObserver = useRef();
  const lastElement = useCallback(
    (element) => {
      if (isLoading) return;
      if (handleObserver.current) handleObserver.current.disconnect();
      handleObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (element) handleObserver.current.observe(element);
    },
    [isLoading, hasNextPage],
  );

  const showModal = (pokemon) => {
    setModalOpen(true);
    setCurrentPokemon(pokemon);
  };

  const pokemons = useMemo(
    () => data?.pages.flatMap((item) => item.data),
    [data],
  );

  if (error) return <div>Error</div>;

  return (
    <>
      <div className={styles["pokedex-container"]}>
        <h1 className={styles["pokedex-container__title"]}>Pokédex</h1>
        <ol className={styles["pokedex-container__cards"]}>
          {pokemons &&
            pokemons.map((pokemon, i) => (
              <div key={i} ref={pokemons.length === i + 1 ? lastElement : null}>
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
              </div>
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
