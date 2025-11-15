import { Channel } from "./channel"

export interface PowerController {
  name: string
  url: string
  channels?: Channel[]
}

export interface PowerControllerList {
  controllerList: PowerController[]
}
