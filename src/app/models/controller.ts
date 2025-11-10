import { Channel } from "./channel"

export interface Controller {
  name: string
  url: string
  channels?: Channel[]
}
