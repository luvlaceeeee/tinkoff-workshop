export const LandingStats = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold">Немного статистики</h1>
      <div className="flex w-full items-center justify-between gap-6 border bg-secondary/50 px-6 animate-in fade-in duration-1000">
        <p className="flex flex-1 flex-col items-center py-4">
          <span className="text-3xl font-bold">3612</span>
          <span className="text-lg font-light text-muted-foreground">
            Пользователей
          </span>
        </p>
        <p className="flex flex-1 flex-col items-center border-x px-6 py-4">
          <span className="text-3xl font-bold">864</span>
          <span className="text-lg font-light text-muted-foreground">
            Активных команд
          </span>
        </p>
        <p className="flex flex-1 flex-col items-center py-4">
          <span className="text-3xl font-bold">235</span>
          <span className="text-lg font-light text-muted-foreground">
            Завершенных проектов
          </span>
        </p>
      </div>
    </div>
  )
}
