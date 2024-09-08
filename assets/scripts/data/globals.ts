import { COMPONENT } from "./constants"

interface Globals{
    whatMoving: COMPONENT
    isPlatformHide: boolean
    score: number
    record: number
}

export const globals: Globals = {
    whatMoving: COMPONENT.STICK,
    isPlatformHide: false,
    score: 0,
    record: 0
}