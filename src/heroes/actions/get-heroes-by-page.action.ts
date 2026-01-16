import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

// http://localhost:5173/?tab=heroes&page=2

export const getHeroesByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = "all"
): Promise<HeroesResponse> => {
  // por si el usuario tipea http://localhost:5173/?tab=heroes&page=asdasd, esto mostramos la pagina 1
  if (isNaN(page)) {
    page = 1;
  }

  if (isNaN(limit)) {
    limit = 6;
  }

  const { data } = await heroApi.get<HeroesResponse>(`/`, {
    params: {
      limit,
      offset: (page - 1) * limit,
      category: category,
    },
  });

  // console.log({ data });

  // hacemos esto asi podemos mandar dinamicamente la url de la imagen, esto es porque la imagen es un archivo que se encuentra en el servidor y no en el cliente.
  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes: heroes,
  };
};
