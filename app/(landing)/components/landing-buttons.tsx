"use client"

import { Button } from "@/components/ui/button"

export const LandingButtons = () => {
  return (
    <div className="space-x-4">
      <Button variant="main" className="relative">
        <span className="relative before:absolute before:-inset-0 before:bg-main before:blur-2xl ">
          <span className="relative">Найти команду</span>
        </span>
      </Button>
      <Button variant="outline" className="relative">
        Узнать больше
      </Button>
    </div>
  )
}
