import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async (options: Options = {}) => {
  const { name, team, category, universe, status, strength } = options;

  // Normalizar strength: si es '0' o vacío, no se considera un filtro válido
  const validStrength = strength && strength !== "0" ? strength : undefined;

  // este if lo hago porque si no le mando nada la api tira 400 y para evitar llamarala hacemos esto.
  if (!name && !team && !category && !universe && !status && !validStrength) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name,
      team,
      category,
      universe,
      status,
      strength: validStrength,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${VITE_API_URL}/images/${hero.image}`,
  }));
};
