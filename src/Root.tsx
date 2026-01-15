import { useEffect, useState } from "react";
import { PokeAPI } from "./api";

// Mappatura dei colori per tipo
const TYPE_COLORS: Record<string, string> = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  normal: "bg-gray-400",
  poison: "bg-purple-500",
  electric: "bg-yellow-400",
  ground: "bg-amber-600",
  fairy: "bg-pink-300",
  fighting: "bg-orange-700",
  psychic: "bg-pink-500",
  rock: "bg-stone-500",
  ghost: "bg-violet-700",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-600",
};

type Props = {
  id: number;
  image: string;
  name: string;
  types: string[];
};

export const Card: React.FC<Props> = ({ id, image, name, types }) => {
  // Prendiamo il colore basandoci sul primo tipo del Pokémon
  const mainType = types[0];
  const bgColor = TYPE_COLORS[mainType] || "bg-gray-200";

  return (
    <div className={`relative ${bgColor} w-64 h-80 text-center flex flex-col items-center justify-center rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transition-transform hover:-translate-y-2`}>
      
      {/* ID in alto a sinistra */}
      <div className="absolute top-3 left-4 font-black text-black text-2xl opacity-30">
        #{id.toString().padStart(3, '0')}
      </div>

      {/* Immagine */}
      <img src={image} alt={name} className="w-32 h-32 object-contain mb-4 drop-shadow-lg" />

      {/* Nome */}
      <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-2 italic">
        {name}
      </h2>

      {/* Badge dei tipi */}
      <div className="flex gap-2">
        {types.map((type) => (
          <span 
            key={type} 
            className="px-3 py-1 bg-white/30 border-2 border-black rounded-md text-xs font-bold uppercase text-black"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export function Root() {
  const [pokemons, setPokemons] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ho aggiunto il limite a 50 per caricare più Pokémon
    PokeAPI.listPokemons(50, 0) 
      .then(async (response) => {
        const transformedPokemons = await Promise.all(
          response.results.map(async (pokemon: any) => {
            const pokemonDetail = await PokeAPI.getPokemonByName(pokemon.name);
            return {
              id: pokemonDetail.id,
              image: pokemonDetail.sprites?.other?.["official-artwork"]?.front_default || "",
              name: pokemonDetail.name,
              types: pokemonDetail.types?.map((t: any) => t.type.name) || [],
            };
          })
        );
        setPokemons(transformedPokemons);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-black uppercase mb-10 border-b-8 border-black inline-block">
        Pokédex 2026
      </h1>

      {loading ? (
        <div className="text-2xl font-bold animate-bounce">Caricamento Pokémon...</div>
      ) : (
        <div className="flex flex-wrap justify-start gap-10">
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))}
        </div>
      )}
    </div>
  );
}