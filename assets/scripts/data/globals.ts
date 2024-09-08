import { COMPONENT } from "./constants"

interface Globals{
    whatMoving: COMPONENT
    platformX: number
    isPlatformHide: boolean
    score: number
    record: number
}

export const globals: Globals = {
    whatMoving: COMPONENT.STICK,
    platformX: 0,
    isPlatformHide: false,
    score: 0,
    record: 0
}