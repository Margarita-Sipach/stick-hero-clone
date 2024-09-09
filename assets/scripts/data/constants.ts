export enum EVENT{
    TOUCH_START = 'TOUCH_START',
    TOUCH_END = 'TOUCH_END',
    LOSS = 'LOSS',
    HIDE_PLATFORM = 'HIDE_PLATFORM',
    HERO_CAME = 'HERO_CAME',
    PLATFORM_STOP = 'PLATFORM_STOP',
}

export const EventDispatcher = new cc.EventTarget();

export enum SCENE{
    START = 'Start',
    GAME = 'Game',
    FINISH = 'Finish',
}

export enum COMPONENT{
    HERO = 'Hero',
    STICK = 'Stick',
    PLATFORM = 'Platform',
    PLATFORMS = 'Platforms',
    LABEL = 'Label'
}

export enum SPEED{
    SLOW = 100,
    MIDDLE = 500,
    FAST = 1000
}

export enum PLATFORM_STATUS{
    HIDDEN = 'HIDDEN',
    START = 'START',
    END = 'END',
}