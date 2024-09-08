import { COMPONENT, EVENT, EventDispatcher, PLATFORM_STATUS, SPEED } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformController extends cc.Component {

    @property(cc.Prefab)
    stick: cc.Prefab = null;

    currentStick: any;
    status: PLATFORM_STATUS

    onLoad() {
        EventDispatcher.on(EVENT.HERO_CAME, this.heroCame, this);
    }

    start () {
        if(this.status === PLATFORM_STATUS.START) this.deleteLabel()
        this.createStick()
    }

    init(width: number, x: number){
        this.node.setPosition(cc.v2(x, ScreenParams.bottom));
        this.node.width = width;

        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;

        collider.apply();
    }
 
    createStick(){
        const stick = cc.instantiate(this.stick);
        this.node.addChild(stick);
        this.currentStick = stick.getComponent(COMPONENT.STICK);
        this.currentStick.init(this.node.width / 2, this.node.height / 2, this.status === PLATFORM_STATUS.START)
    }

    heroCame(){
        if(this.status === PLATFORM_STATUS.END) {
            this.deleteLabel()  
        }
    }

    deleteLabel(){
        const label = this.node.getChildByName(COMPONENT.LABEL)
        this.node.removeChild(label)
    }

    update (dt) {
        this.currentStick.init(this.node.width / 2, this.node.height / 2, this.status === PLATFORM_STATUS.START);

        switch(globals.whatMoving){
            case COMPONENT.PLATFORMS:
                this.node.x -= SPEED.SLOW * dt
                const isStickMoving = this.node.x <= ScreenParams.left && this.status === PLATFORM_STATUS.START && globals.isPlatformHide
                
                if(isStickMoving){
                    globals.whatMoving = COMPONENT.STICK
                }
                if(this.status === PLATFORM_STATUS.END){
                    this.currentStick.reset()
                }
        }
    }
}