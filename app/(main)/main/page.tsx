import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { MainResumes } from "./components/main-resume"
import { MainVacancies } from "./components/main-vacancies"

async function MainPage() {
  const session = await getServerSession(authOptions)
  const res = await fetch("http://localhost:8080/api/v1/requests", {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  })
  console.log(session)
  return (
    <>
      <MainResumes />
      <MainVacancies />
    </>
  )
}

export default MainPage
