import React from "react";

type Props = {
  image: string;
  name: string;
};

export const Card: React.FC<Props> = ({ image, name }) => {
  return (
    <div className="w-60 h-60 border-2 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
      <img
        src={image}
        alt={name}
        className="w-30 h-20 object-contain mb-2"
      />

      <h2 className="text-xl font-bold capitalize">{name}</h2>
    </div>
  );
};
