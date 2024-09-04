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
        this.platformFrom.init(500, this.screenLeft)
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

        const xOffset = getRandomNumber(this.xOffsetMin, this.xOffsetMax);

        data.x = (this.platformFrom.x || 0) + 100// + xOffset;
        data.width = getRandomNumber(this.platformWidthMin, this.platformWidthMax);

        return data
    }

    update (dt) {
        const currentPlatformRight = this.platformFrom ? this.platformFrom.node.x + this.platformFrom.node.width / 2 : this.screenLeft;
        const currentPlatformLeft = this.platformFrom ? this.platformFrom.node.x - this.platformFrom.node.width / 2 : this.screenLeft;
        // cc.log()
        switch(globals.whatMoving){
            case 'hero': 
               
                break
            case 'platforms': 
            cc.log(this.platformFrom.node.x, this.platformFrom.node.width, this.screenLeft)
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