import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useQuery } from "@tanstack/react-query";

export const SearchPage = () => {

  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const strength = searchParams.get('strength') ?? '0'

  const { data: heroes = [] } = useQuery({
    queryKey: ['search-heroes', {name, strength}],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutos

  })

  return (
    <div>
      <CustomJumbotron title="Busqueda de Superheroes" description="Descubre, explora y administra tus superheroes y villanos favoritos" />
      
      <CustomBreadcrumbs currentPage="Super Heroes"
        breadcrumbs={[
          { label: 'Home1', to: '/' },
          { label: 'Home2', to: '/' },
          { label: 'Home3', to: '/' },
        ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />


      {/* Search Controls */}
      <SearchControls />


      
      <HeroGrid heroes={heroes} />

    </div>
  )
}

export default SearchPage;