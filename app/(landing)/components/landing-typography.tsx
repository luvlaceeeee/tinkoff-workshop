import { landingConfig } from "../config/landing"

export const LandingTypography = () => {
  return (
    <div className="cursor-default space-y-6">
      <h1 className="text-7xl font-bold">
        <span className="relative font-extrabold tracking-tighter text-main before:absolute before:-inset-0 before:bg-main/30 before:blur-2xl">
          CodeCrew
        </span>{" "}
        - Ваша платформа для совместного роста!
      </h1>
      <p className="text-2xl text-muted-foreground">
        {landingConfig.description}
      </p>
    </div>
  )
}
