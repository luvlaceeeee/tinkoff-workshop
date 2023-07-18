import { SearchVacanciesContent } from "./components/search-vacancies-content"
import { SearchVacanciesHeader } from "./components/search-vacancies-header"

export default function SearchVacanciesPage() {
  return (
    <div className="flex flex-col gap-5">
      <SearchVacanciesHeader />
      <SearchVacanciesContent />
    </div>
  )
}
