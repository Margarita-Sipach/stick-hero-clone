import { COMPONENT, EVENT, EventDispatcher, SPEED } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroController extends cc.Component {

    isContactStick = false

    onLoad () {
        this.boxColliderInit()
    }
    
    boxColliderInit(){
        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = 1;
        collider.offset.x = collider.offset.x + this.node.width / 2
        collider.apply();
    }

    onBeginContact(contact, selfCollider, otherCollider){
        this.isContactStick = otherCollider.node.name === COMPONENT.STICK
    }

    onEndContact(contact, selfCollider, otherCollider){
        this.isContactStick = !(otherCollider.node.name === COMPONENT.STICK)
    }

    update (dt) {
        switch(globals.whatMoving){
            case COMPONENT.HERO:
                this.node.x += SPEED.FAST * dt;
                
                if(!this.isContactStick && this.node.x >= globals.platformX){
                    EventDispatcher.emit(EVENT.HERO_CAME)
                }
                break;
            case COMPONENT.PLATFORMS:
                this.node.x -= SPEED.SLOW * dt
                break;
        }
        if(this.node.y < 350 / 2 + ScreenParams.bottom) return EventDispatcher.emit(EVENT.LOSS)
    }

    
}
