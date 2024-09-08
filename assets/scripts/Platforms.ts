// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { COMPONENT, EVENT, EventDispatcher, PLATFORM_STATUS } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";
import { getRandomNumber } from "./utils/getRandomNumber";

const {ccclass, property} = cc._decorator;

interface Platform{
    width: number
    x: number
}

@ccclass
export default class PlatformsController extends cc.Component {

    @property
    platformWidthMin: number = 50;

    @property
    platformWidthMax: number = 200;

    @property (cc.Prefab)
    platform: cc.Prefab = null;

    platforms: any[] = []

    platformStart
    platformEnd
    platformHidden

    start () {
        this.init()
    }

    init(){
        const defaultPlatformsParams = [
            [ 300, ScreenParams.left - 100],
            [ 500, ScreenParams.left],
            [ 200, 0 ]
        ]

        this.platforms = []
        for(let i = 0; i < 3; i++) this.createNewPlatform()

        this.platformHidden = this.platforms[0]
        this.platformStart = this.platforms[1]
        this.platformEnd = this.platforms[2]

        this.updatePlatforms()

        this.platformHidden.init(...defaultPlatformsParams[0])
        this.platformStart.init(...defaultPlatformsParams[1])
        this.platformEnd.init(...defaultPlatformsParams[2])
    }

    updatePlatforms(baseData?: Platform){
        const data = baseData || this.generatePlatformParams();

        [this.platformHidden, this.platformStart, this.platformEnd] = [this.platformStart, this.platformEnd, this.platformHidden]

        this.platformStart.status = PLATFORM_STATUS.START
        this.platformEnd.status = PLATFORM_STATUS.END
        this.platformHidden.status = PLATFORM_STATUS.HIDDEN
        
        this.platformEnd.init(data.width, data.x)
    }

    createNewPlatform(){
        const platform = cc.instantiate(this.platform);
        this.node.addChild(platform);
        const platformNode = platform.getComponent(COMPONENT.PLATFORM);
        this.platforms.push(platformNode)
    }

    generatePlatformParams(){
        const data = {
            width: 0,
            x: 0
        }

        data.width = getRandomNumber(this.platformWidthMin, this.platformWidthMax);

        const xOffsetMax = this.platformEnd.node.x - this.platformEnd.node.width / 2 + ScreenParams.width - data.width / 2
        const xOffsetMin = ScreenParams.right
        const xOffset = getRandomNumber(xOffsetMin, xOffsetMax);

        data.x = xOffset

        return data
    }

    update (dt) {
        const getStartPlatformX = (isLeft?: boolean) => this.platformStart.node.x + (isLeft ? -1 : 1) * this.platformStart.node.width / 2;

        switch(globals.whatMoving){
            case COMPONENT.PLATFORMS: 
                const startPlatformRight = getStartPlatformX()
                const startPlatformLeft = getStartPlatformX(true)

                const isStartPlatformHide = startPlatformRight <= ScreenParams.left && !globals.isPlatformHide
                const isStartPlatformTouchLeftSide = startPlatformLeft <= ScreenParams.left && globals.isPlatformHide

                if(isStartPlatformHide) {
                    this.handleReplacePlatforms()
                }
                if(isStartPlatformTouchLeftSide){
                    this.handleStopPlatforms()
                }
                break
            case COMPONENT.STICK: 
                const endPlatformRight = this.platformEnd.node.x + this.platformEnd.node.width / 2
                EventDispatcher.emit(EVENT.PLATFORM_STOP, endPlatformRight);
                break
        }
    }

    handleReplacePlatforms(){
        this.updatePlatforms()
        globals.isPlatformHide = true
    }

    handleStopPlatforms(){
        globals.isPlatformHide = false
        globals.whatMoving = COMPONENT.STICK
    }


}