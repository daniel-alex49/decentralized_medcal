import { SearchFilter } from "./components/search-filter"

export default async function Products() {
  return (
    <div className="flex gap-2">
      <section id="filters" className="max-w-lg flex-1 border-r p-4">
        <div className="w-full">
          <SearchFilter />
        </div>
      </section>
      <section
        id="filters"
        className="max-w-lg flex-1 bg-secondary p-4"
      ></section>
      <section
        id="filters"
        className="max-w-lg flex-1 bg-secondary p-4"
      ></section>
    </div>
  )
}
