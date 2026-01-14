import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
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

    </div>
  )
}

export default SearchPage;