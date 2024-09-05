export enum EVENT{
    TOUCH_START = 'TOUCH_START',
    TOUCH_END = 'TOUCH_END',
    LOSS = 'LOSS',
    HIDE_PLATFORM = 'HIDE_PLATFORM'
}

export const EventDispatcher = new cc.EventTarget();