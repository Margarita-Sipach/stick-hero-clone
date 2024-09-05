export class ScreenParams {
    static get left() {
        return -cc.winSize.width / 2;
    }

    static get right() {
        return cc.winSize.width / 2;
    }

    static get top() {
        return cc.winSize.height / 2;
    }

    static get bottom() {
        return -cc.winSize.height / 2;
    }

    static get width() {
        return cc.winSize.width;
    }
}
