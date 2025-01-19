// tests/__mocks__/pokemonMocks.ts
export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  attacks: {
    fast: { name: string; type: string; damage: number }[];
    special: { name: string; type: string; damage: number }[];
  };
  image: string; // Added image property
}

export const bulbasaur: Pokemon = {
  id: "001",
  name: "Bulbasaur",
  types: ["Grass", "Poison"],
  weight: {
    minimum: "6.9 kg",
    maximum: "7.0 kg",
  },
  height: {
    minimum: "0.7 m",
    maximum: "0.8 m",
  },
  attacks: {
    fast: [
      { name: "Tackle", type: "Normal", damage: 12 },
      { name: "Vine Whip", type: "Grass", damage: 7 },
    ],
    special: [{ name: "Power Whip", type: "Grass", damage: 70 }],
  },
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

export const charmander: Pokemon = {
  id: "004",
  name: "Charmander",
  types: ["Fire"],
  weight: {
    minimum: "8.5 kg",
    maximum: "9.0 kg",
  },
  height: {
    minimum: "0.6 m",
    maximum: "0.7 m",
  },
  attacks: {
    fast: [
      { name: "Scratch", type: "Normal", damage: 6 },
      { name: "Ember", type: "Fire", damage: 10 },
    ],
    special: [{ name: "Flamethrower", type: "Fire", damage: 55 }],
  },
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
};

export const squirtle: Pokemon = {
  id: "007",
  name: "Squirtle",
  types: ["Water"],
  weight: {
    minimum: "9.0 kg",
    maximum: "10.0 kg",
  },
  height: {
    minimum: "0.5 m",
    maximum: "0.6 m",
  },
  attacks: {
    fast: [
      { name: "Tackle", type: "Normal", damage: 12 },
      { name: "Bubble", type: "Water", damage: 12 },
    ],
    special: [{ name: "Aqua Tail", type: "Water", damage: 50 }],
  },
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
};
