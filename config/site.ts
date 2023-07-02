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
      href: "/searchTeam",
    },
    {
      title: "Создать команду",
      href: "/createTeam",
    },
  ],
}
