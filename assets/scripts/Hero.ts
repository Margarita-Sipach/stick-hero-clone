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

    screenLeft = -cc.winSize.width / 2

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    isGoing = false

    isContactStick = false
    isContactPlatform = true

    contactX = 0
    step: boolean;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.contactX = this.screenLeft

        // let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        // collider.size.width = 1;
        // collider.offset.x = collider.offset.x - this.node.width / 2

        // collider.apply();
    }
    
    

    start () {

    }


    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.name === 'stick'){
            this.isContactStick = true
        }
        if(otherCollider.node.name === 'platform'){
            otherCollider.node.isMain = true
            this.isContactPlatform = true
            
            // this.contactX = this.node.x + this.node.width
        }
    }

    onEndContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.name === 'stick'){
            this.isContactStick = false
            this.isGoing = false
        }
        if(otherCollider.node.name === 'platform'){
            this.isContactPlatform = false
        }
    }

    update (dt) {
        switch(globals.whatMoving){
            case 'hero':
                for(let i = 0; i < 10; i++) {
                    this.node.x++;

                    if(!this.isContactStick && this.node.x >= globals.platformX){ 
                        // globals.isGameMove = true;
                        globals.whatMoving = 'platforms'
                    }
                }
                break;
            case 'platforms':
                this.node.x -= 150 * dt
                break;
            case 'stick':
                break;
        }
        
        // if(!this.isContactPlatform && !this.isContactStick) return this.node.y--
    }
}
