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

    @property(cc.Node)
    hero: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
    }

    start () {
    }

    init(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true

        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_joinBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            globals.isTouching = true
        })

        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            globals.isTouching = false

        })
    }

    // update (dt) {}
}
