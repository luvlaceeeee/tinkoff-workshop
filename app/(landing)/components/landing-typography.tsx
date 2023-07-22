import { landingConfig } from "../config/landing"

export const LandingTypography = () => {
  return (
    <div className="cursor-default space-y-6 text-center md:text-left">
      <h1 className="text-4xl font-bold md:text-7xl">
        <span className="relative text-5xl font-extrabold tracking-tighter text-main before:absolute before:-inset-0 before:bg-main/30 before:blur-2xl md:text-7xl">
          {landingConfig.name}
        </span>{" "}
        {landingConfig.subName}
      </h1>
      <p className="text-muted-foreground md:text-2xl">
        {landingConfig.description}
      </p>
    </div>
  )
}
