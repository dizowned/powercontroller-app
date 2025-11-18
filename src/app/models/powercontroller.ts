import { Channel } from "./channel"

export interface PowerController {
  name: string
  url: string
  channels?: Channel[]
}

export interface PowerControllerList {
  controllers: PowerController[]
}

export function extractControllers(list: PowerControllerList | null | undefined): PowerController[] {
  return (list && Array.isArray(list.controllers)) ? list.controllers : [];
}
