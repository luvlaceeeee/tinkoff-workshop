import { MainResumes } from "./components/main-resume"
import { MainVacancies } from "./components/main-vacancies"

async function MainPage() {
  return (
    <>
      <MainResumes />
      <MainVacancies />
    </>
  )
}

export default MainPage
