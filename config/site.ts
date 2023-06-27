export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "CodeCrew",
  description:
    "Открой новые возможности с командой мечты: найди соработников для воплощения проектов.",
  navButton: [
    {
      title: "Главная",
      href: "/",
    },
    {
      title: "Найти команду",
      href: "/searchTeam",
    },
    {
      title: "Собрать команду",
      href: "/createTeam",
    },
  ],
}
