import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from '@/heroes/pages/home/HomePage';
import { HeroPage } from "@/heroes/pages/hero/HeroPage";



// de esta forma el componente se carga solo cuando se necesita
// recordar poner la importacion por defeccto sino deberiamos usar la siguiente sintaxis:
// const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage").then(module => ({ default: module.SearchPage })));
const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));
// SE RECOMIENDA QUE LAS PAGINAS QUE NO SON TAN COMUNMENTE ACCESADAS COMO EL ADMIN QUE CARGEN DE PANERA PEREZOSA


export const appRouter = createBrowserRouter([
  {
    
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
       },
       {
          path: "/heroes/:idSlug",
          element: <HeroPage  />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "*",
        // element: <NotFoundPage />, // habria que realizar esta page
        element: <Navigate to="/" />
      }
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout  />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  
]);
