// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { globals } from "./data/globals";
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

    @property
    xOffsetMin: number = 60;

    @property
    xOffsetMax: number = 200;

    @property (cc.Prefab)
    platform: cc.Prefab = null;

    platforms: any[] = []

    platformFrom
    platformTo
    
    screenRight = cc.winSize.width / 2
    screenLeft = -cc.winSize.width / 2
    screenWidth = cc.winSize.width

    start () {
        this.platforms = []
        this.createNewPlatform()
        this.createNewPlatform()
        
        this.platformFrom = this.platforms[0]
        this.platformTo = this.platforms[1]

        this.createPlatform()
        this.platformFrom.init(500, this.screenLeft)
        this.platformTo.init(200, 0)
    }

    createPlatform(baseData?: Platform){
        const data = baseData || this.generatePlatformParams();

        [this.platformFrom, this.platformTo] = [this.platformTo, this.platformFrom]

        this.platformFrom.status = 'from'
        this.platformTo.status = 'to'
        
        this.platformTo.init(data.width, data.x)
    }

    createNewPlatform(){
        const platform = cc.instantiate(this.platform);
        this.node.addChild(platform);
        const platformNode = platform.getComponent('Platform');
        this.platforms.push(platformNode)
    }

    generatePlatformParams(){
        const data = {
            width: 0,
            x: 0
        }

        data.width = getRandomNumber(this.platformWidthMin, this.platformWidthMax);

        const xOffsetMax = this.platformTo.node.x - this.platformTo.node.width / 2 + this.screenWidth - data.width / 2
        const xOffsetMin = this.screenRight
        const xOffset = getRandomNumber(xOffsetMin, xOffsetMax);

        data.x = xOffset

        return data
    }

    update (dt) {
        const currentPlatformRight = this.platformFrom ? this.platformFrom.node.x + this.platformFrom.node.width / 2 : this.screenLeft;
        const currentPlatformLeft = this.platformFrom ? this.platformFrom.node.x - this.platformFrom.node.width / 2 : this.screenLeft;

        switch(globals.whatMoving){
            case 'platforms': 
                if(currentPlatformRight <= this.screenLeft && !globals.isPlatformHide) {
                    this.createPlatform()
                    globals.isPlatformHide = true
                }
                else if(currentPlatformLeft <= this.screenLeft && globals.isPlatformHide){
                    globals.isPlatformHide = false
                    globals.whatMoving = 'stick'
                }
                break
            case 'stick': 
                globals.platformX = this.platformTo.node.x + this.platformTo.node.width / 2 - 67
                break

        }
        
    }
}