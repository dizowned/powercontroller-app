import { channel } from "./channel"

export interface PowerController {
  id: number;
  name: string
  url: string
  channels: channel[]
}

export interface PowerControllerList {
  controllers: PowerController[]
}

export function extractControllers(list: PowerControllerList | null | undefined): PowerController[] {
  return (list && Array.isArray(list.controllers)) ? list.controllers : [];
}
