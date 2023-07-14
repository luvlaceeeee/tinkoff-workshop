export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "CodeCrew",
  description:
    "Открой новые возможности с командой мечты: найди соработников для воплощения проектов.",
  navButton: [
    {
      title: "Главная",
      href: "/main",
    },
    {
      title: "Поиск команды",
      href: "/search/vacancies",
    },
    {
      title: "Создать команду",
      href: "/create/project",
    },
  ],
}
