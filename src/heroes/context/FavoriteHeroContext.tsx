import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";


interface FavoriteHeroContext {
  // state
  favorites: Hero[];
  favoriteCount: number;

  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);


// Pasamos por el local storage, es buena idea cada vez que tomemos algo del localstorage pasarlo por algun validador de schemas como por ejemplo Zod, asi no nos manipula la data el cliente y nos preparamos a eso jeje tip pro
const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(favorites);
  }
  return [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  // en lo posible en react evitar usar useStates y useEffects, usarlos cuando realmente hagan falta
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

  const toggleFavorite = (heroe: Hero) => {
    
    const heroExist = favorites.find((favorite) => favorite.id === heroe.id);
    
    if (heroExist) {
      const newFavorites = favorites.filter((favorite) => favorite.id !== heroe.id);
     setFavorites( newFavorites );
     return;
    }

    setFavorites([...favorites, heroe]);
  }

  const isFavorite =  (hero: Hero) => favorites.some((favorite) => favorite.id === hero.id)


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  

  return (

    // en versiones de react 19+ no hace poner .Provider, se puede usar el context directamente
    // <FavoriteHeroContext.Provider value={{}}>
    <FavoriteHeroContext value={{
      favorites: favorites,
      favoriteCount: favorites.length,
      // el some regresa true ni bien encuentre un elemento que cumpla la condicion
      isFavorite: isFavorite,
      toggleFavorite: toggleFavorite,
    }}>
      {children}
    </FavoriteHeroContext>
  )
}