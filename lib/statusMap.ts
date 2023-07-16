const StatusName: Record<string, string> = {
  "Project is in preparation stage": "Подготавливается",
  "Project is in progress": "В процессе разработки",
  "Project is closed": "Закрыт",
  "Project is frozen": "Заморожен",
}

export const statusMap = (initial: string) => {
  return StatusName[initial]
}
