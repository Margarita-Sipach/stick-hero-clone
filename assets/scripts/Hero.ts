import { EVENT, EventDispatcher } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroController extends cc.Component {

    isContactStick = false
    isContactPlatform = true

    contactX = 0

    onLoad () {
        this.contactX = ScreenParams.left
        this.boxColliderInit()
    }
    
    boxColliderInit(){
        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = 1;
        collider.offset.x = collider.offset.x + this.node.width / 2
        collider.apply();
    }

    onBeginContact(contact, selfCollider, otherCollider){
        this.isContactStick = otherCollider.node.name === 'stick'
        this.isContactPlatform = otherCollider.node.name === 'platform'
    }

    onEndContact(contact, selfCollider, otherCollider){
        this.isContactStick = !(otherCollider.node.name === 'stick')
        this.isContactPlatform = !(otherCollider.node.name === 'platform')
    }

    update (dt) {
        switch(globals.whatMoving){
            case 'hero':
                this.node.x += 1000 * dt;
                
                if(!this.isContactStick && this.node.x >= globals.platformX){
                    globals.score++
                    globals.whatMoving = 'platforms'
                }
                break;
            case 'platforms':
                this.node.x -= 150 * dt
                break;
        }
        if(this.node.y < 350 / 2 + ScreenParams.bottom) EventDispatcher.emit(EVENT.LOSS)
    }

    
}
