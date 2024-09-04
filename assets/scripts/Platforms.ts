// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { getRandomNumber } from "./utils/getRandomNumber";

const {ccclass, property} = cc._decorator;

interface Platform{
    width: number
    x: number
}

@ccclass
export default class NewClass extends cc.Component {

    @property
    platformWidthMin: number = 50;

    @property
    platformWidthMax: number = 500;

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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.platforms = []
        this.createNewPlatform()
        this.createNewPlatform()
        
        this.platformFrom = this.platforms[0]
        this.platformTo = this.platforms[1]

        this.createPlatform()
        this.platformFrom.init(500, 0)
    }

    createPlatform(baseData?: Platform){
        const data = baseData || this.generatePlatformParams();      
        [this.platformFrom, this.platformTo] = [this.platformTo, this.platformFrom]
        
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

        const xOffset = getRandomNumber(this.xOffsetMin, this.xOffsetMax);

        data.x = this.screenRight + xOffset;
        data.width = getRandomNumber(this.platformWidthMin, this.platformWidthMax);

        return data
    }

    update (dt) {
        const currentPlatformRight = this.platformFrom ? this.platformFrom.node.x + this.platformFrom.node.width : this.screenLeft;
        if(currentPlatformRight <= this.screenLeft) {
            this.createPlatform()
        }
    }
}