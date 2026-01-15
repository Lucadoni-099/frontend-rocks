import { useEffect, useState } from "react";
import { PokeAPI } from "./api";
import { Card } from "./card";

type Pokemon = {
  name: string;
  image: string;
};

export function Root() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await PokeAPI.listPokemons();

        const transformedPokemons = await Promise.all(
          response.results.map(async (pokemon: any) => {
            const detail = await PokeAPI.getPokemonByName(pokemon.name);

            return {
              name: detail.name,
              image:
                detail.sprites?.other?.["official-artwork"]?.front_default ||
                "",
            };
          })
        );

        setPokemons(transformedPokemons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchPokemons();
  }, []);

  return (
    <div className="pt-4 pl-4 flex flex-wrap gap-4">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} name={pokemon.name} image={pokemon.image} />
      ))}
    </div>
  );
}
