import { useEffect, useState } from "react";
import { PokeAPI } from "./api";

// Mappatura colori per tipo (stile vivace)
const TYPE_COLORS: Record<string, string> = {
  grass: "bg-green-400",
  fire: "bg-red-500",
  water: "bg-blue-400",
  bug: "bg-lime-400",
  normal: "bg-stone-300",
  poison: "bg-purple-400",
  electric: "bg-yellow-300",
  ground: "bg-amber-500",
  fairy: "bg-pink-200",
  fighting: "bg-orange-600",
  psychic: "bg-pink-400",
  rock: "bg-gray-500",
  ghost: "bg-indigo-400",
  ice: "bg-cyan-200",
  dragon: "bg-violet-500",
  steel: "bg-slate-300",
};

type PokemonData = {
  id: number;
  image: string;
  name: string;
  types: string[];
};


const Card = ({ id, image, name, types }: PokemonData) => {
  const mainType = types[0];
  const bgColor = TYPE_COLORS[mainType] || "bg-gray-200";

  return (
    <div className={`relative ${bgColor} w-56 h-72 flex flex-col items-center justify-center rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transition-transform hover:-translate-y-2 hover:rotate-1`}>
    
      <div className="absolute top-3 left-4 font-black text-black text-xl opacity-25">
        #{id.toString().padStart(3, '0')}
      </div>

      
      <img 
        src={image} 
        alt={name} 
        className="w-32 h-32 object-contain mb-3 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]" 
      />

      
      <h2 className="text-xl font-black uppercase tracking-tight text-black mb-3 truncate w-full text-center px-1">
        {name}
      </h2>

    
      <div className="flex gap-1.5">
        {types.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-white/40 border-2 border-black rounded-lg text-[10px] font-black uppercase text-black">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export function Root() {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    PokeAPI.listPokemons(100, 0)
      .then(async (response) => {
        const detailPromises = response.results.map(async (p: any) => {
          const detail = await PokeAPI.getPokemonByName(p.name);
          return {
            id: detail.id,
            image: detail.sprites?.other?.["official-artwork"]?.front_default || detail.sprites.front_default,
            name: detail.name,
            types: detail.types.map((t: any) => t.type.name),
          };
        });

        const results = await Promise.all(detailPromises);
        setPokemons(results);
        setLoading(false);
      })
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter text-black">
          Pokédex <span className="text-red-600">100</span>
        </h1>
        <div className="h-2 w-48 bg-black mt-2"></div>
      </header>

      {loading ? (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-8 border-black border-t-red-500 rounded-full animate-spin"></div>
          <span className="text-2xl font-black uppercase">Catturando i Pokémon...</span>
        </div>
      ) : (
        
        <div className="flex flex-wrap justify-start gap-8">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} {...pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}