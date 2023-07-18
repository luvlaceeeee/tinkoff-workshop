import { CreateVacancyForm } from "./components/create-vacancy-form"

export default function ProjectCreateVacancyPage({
  params,
}: {
  params: { id: string }
}) {
  return <CreateVacancyForm projectId={+params.id} />
}
