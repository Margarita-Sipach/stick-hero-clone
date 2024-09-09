import { COMPONENT, EVENT, EventDispatcher, SPEED } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroController extends cc.Component {

    isContactStick = false
    endPlatformRight: number;
    startY = ScreenParams.top

    onLoad () {
        this.startY = this.node.y
        this.boxColliderInit()
        EventDispatcher.on(EVENT.PLATFORM_STOP, (endPlatformRight: number) => this.endPlatformRight = endPlatformRight, this)
    }
    
    boxColliderInit(){
        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = 1;
        collider.offset.x = collider.offset.x + this.node.width * this.node.scale
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
                this.node.x += SPEED.MIDDLE * dt;
                
                const isHeroCame = !this.isContactStick && this.node.x >= this.endPlatformRight - this.node.width * this.node.scale
                if(isHeroCame) EventDispatcher.emit(EVENT.HERO_CAME)
                break;
            case COMPONENT.PLATFORMS:
                this.node.x -= SPEED.MIDDLE * dt
                break;
        }
        const isHeroFell = this.node.y < this.startY / 2 + ScreenParams.bottom
        if(isHeroFell) return EventDispatcher.emit(EVENT.LOSS)
    }
}
