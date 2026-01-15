
import pokemonImg from "./pokemon.jpeg"; 


export const Root = () => {
  return (
    <div className="text-xl flex flex-wrap justify-center gap-6 p-10">
      <div className="relative bg-green-500 w-64 h-80 text-center flex flex-col items-center justify-center rounded-xl shadow-lg p-4">
        <div className="absolute top-4 left-6 font-bold text-gray-800 text-2xl">
          0
        </div>
        <img 
          src={pokemonImg} 
          alt="Froakie" 
          className="w-40 h-40 object-contain mb-4" 
        />
        <span className="font-bold uppercase tracking-widest text-2xl">
          FROAKIE
        </span>
        <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold uppercase shadow-sm">
          Acqua
        </div>
        
      </div>

    </div>
  );
};