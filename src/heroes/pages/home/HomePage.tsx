import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from '../../hooks/useHeroSummary';
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"

/*
React Router hooks (URL)

✅ useParams()
- Lee parámetros del PATH (ruta)
- Vienen definidos en la ruta con :variable
Ej: /productos/:id  →  /productos/123  →  const { id } = useParams()  // "123"

✅ useSearchParams() 
https://reactrouter.com/api/hooks/useSearchParams#usesearchparams
- Lee parámetros de QUERY STRING (después del ?)
- Se usan para filtros, paginación, orden, búsqueda
Ej: /productos?cat=teclados&page=2  →  searchParams.get("page")  // "2"
- También permite setearlos: setSearchParams({ page: "3" })

Resumen:
- useParams = datos estructurales/identidad en la ruta (id, slug)
- useSearchParams = estado opcional en la URL (filtros, page, sort)
*/


export const HomePage = () => {


  const [searchParams, setSearchParams] = useSearchParams()
  const { favoriteCount, favorites } = use(FavoriteHeroContext)



  // console.log({ searchParams })
  const activeTab = searchParams.get("tab") ?? "all"
  const page = searchParams.get("page") ?? 1
  const limit = searchParams.get("limit") ?? 6
  const category = searchParams.get("category") ?? "all"

  // validamos el tab seleccionado
  
 const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);


  // // ESTO NO SE HACE MAS, USAMOS useSearchParams PARA ESTO
  // // Osea no es que no se usa mas sino que para siciertos escenarios no conviene por ejemplo si quisiesemos compartir la apgina tal cual este con la tab indicada seleccioanada, se complicaria, seria imposible con use state, entonces uasamos la url
  // // const [activeTab, setActiveTab] = useState<
  // //   'all' | 'favorites' | 'heroes' | 'villains'
  // //   >('all');
  
  
  // // Esto no se hace mas, trae problemass, usaremos tanstack query para esto, esto nos simplefica el tema de cache, estado, logica, loading y error.
  // // useEffect(() => {
  // //   getHeroesByPageAction().then((heroes) => {
  // //     console.log({heroes});
  // //   });
  // // }, []);
  // // USAREMOS TANSTACK QUERY PARA ESTO
  // const { data: heroesResponse, isLoading, error } = useQuery({
  //   // heroes: espacio en memoria donde se va a guardar la data
  //   // si dejo el mouse arriba de data vemos que puede ser undefined, esto es porque la data puede no estar disponible en el momento de la consulta.
  //   // queryKey = "identificador único" de la consulta en TanStack Query.
  //   // React Query lo usa para:
  //   // 1) cachear la respuesta en memoria
  //   // 2) saber cuándo es una consulta distinta
  //   //
  //   // Ej: ['heroes', 'page', 1, 'limit', 10] !== ['heroes', 'page', 2, 'limit', 10]
  //   // o sea: si cambia page o limit, cambia el queryKey -> cambia la cache -> vuelve a pedir data.
  //   //
  //   // En resumen: queryKey define "qué data es" (heroes) + sus parámetros (page, limit).
  //   // cuando los argumentos no son posisionales se recomienda usar un objeto para que sea mas legible y facil de entender.
  //   queryKey: ['heroes', {page: page, limit: limit}],
  //   // queryFn: funcion que va a ejecutar para obtener la data
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   // staleTime: tiempo en que la data se considera como vieja y se vuelve a obtener
  //   staleTime: 1000 * 60 * 60 * 24, // 24 horas

  // });

  // const { data: summary } = useQuery({
  //   queryKey: ['summary-information'],
  //   queryFn: getSummaryAction,
  //   staleTime: 1000 * 60 * 5, // 5 minutos
  // });


  // USEMOS LOS CUSTOM HOOKS PARA ESTO
  const { data: summary } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  // console.log({ heroesResponse, isLoading, error });

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Busqueda de Superheroes" description="Descubre, explora y administra tus superheroes y villanos favoritos" />

        <CustomBreadcrumbs currentPage="Super Heroes" />

        <HeroStats />
        

        

        {/* Tabs */}
        {/* si el usuario me modifica en la url la tab, y popne una que no existe no se rompera nada */}
        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  // al usarlo de esta forma si nos movemos entre tabs, si tuvvieramos otro valor por ejemplo la page, no se desrtuiria, se mantiene el valor de la page
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <h1>Favoritos!!!</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los Villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>


        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={heroesResponse?.pages || 0} />
          )
        }

       
      </>
    </>
  )
}
