type WhatMoving = 'platforms' | 'hero' | 'stick'

interface Globals{
    whatMoving: WhatMoving
    isTouching: boolean
    platformX: number
    isPlatformHide: boolean
}

export const globals: Globals = {
    whatMoving: 'stick',
    isTouching: false,
    platformX: 0,
    isPlatformHide: false
}