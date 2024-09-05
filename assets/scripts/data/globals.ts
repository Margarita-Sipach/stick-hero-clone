type WhatMoving = 'platforms' | 'hero' | 'stick'

interface Globals{
    whatMoving: WhatMoving
    platformX: number
    isPlatformHide: boolean
    score: number
    record: number
}

export const globals: Globals = {
    whatMoving: 'stick',
    platformX: 0,
    isPlatformHide: false,
    score: 0,
    record: 0
}