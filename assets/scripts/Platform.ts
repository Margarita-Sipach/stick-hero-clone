// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    stick: cc.Prefab = null;

    active: boolean;

    screenRight = cc.winSize.width / 2
    screenLeft = -cc.winSize.width / 2
    screenBottom = -cc.winSize.height / 2
    currentStick: any;
    isMain: boolean;
    status: 'from' | 'to'

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        

    }

    start () {
        this.createStick()

    }

    init(width, x){
        this.active = true
        this.node.setPosition(cc.v2(x, this.screenBottom));
        this.node.width = width;

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;

        collider.apply();
    }

 
    createStick(){
        const stick = cc.instantiate(this.stick);
        this.node.addChild(stick);
        this.currentStick = stick.getComponent('Stick');
        this.currentStick.init(this.node.width / 2, this.node.height / 2, this.status === 'from')
    }

    update (dt) {
        this.currentStick.init(this.node.width / 2, this.node.height / 2, this.status === 'from');

        switch(globals.whatMoving){
            case 'platforms':
                this.node.x -= 150 * dt
                const platformLeft = this.node.x;
                
                if(platformLeft <= this.screenLeft && this.status === 'from' && globals.isPlatformHide){
                    globals.whatMoving = 'stick'
                }
                if(this.status === 'to' && globals.isPlatformHide){
                    this.currentStick.reset()
                }
        }
        // if(globals.whatMoving === 'platforms'){
           
            // if(this.node.x - this.node.width / 2 < this.screenLeft && !this.isMain){
            //     this.isMain = true
            //     this.currentStick.canGrowing = true
            //     globals.whatMoving = "platforms"
            // }
            // // else{
            //     this.currentStick.canGrowing = false
            // }
        // }


        
    }
}