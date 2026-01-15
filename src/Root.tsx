import { useState, useEffect } from "react";
import { Link } from "react-router";


const stilecard = "bg-purple-500 w-64 h-80 text-center flex flex-col items-center justify-center rounded-xl p-4";
import pokemonImg from "./pokemon.jpeg"; // CORRETT
export const Root = () => {
  return (
    <div className="text-xl space-x-7 flex flex-wrap justify-center gap-6 p-10">
      
     
      <div className="bg-yellow-500 w-64 h-80 text-center flex flex-col items-center justify-center rounded-xl shadow-lg p-4">
        
        
        <img 
          src={pokemonImg} 
          alt="Froakie" 
          className="w-40 h-40 object-contain mb-4" 
        />
        
        <span className="font-bold uppercase tracking-widest text-2xl">
          FROAKIE
        </span>
        
      </div>
          
    </div>
  );
};