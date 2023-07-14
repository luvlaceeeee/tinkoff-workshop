import { SearchResumesContent } from "./components/search-resumes-content"
import { SearchResumesHeader } from "./components/search-resumes-header"

export default function SearchResumesPage() {
  return (
    <div className="flex flex-col gap-5">
      <SearchResumesHeader />
      <SearchResumesContent />
    </div>
  )
}
