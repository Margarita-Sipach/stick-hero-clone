import { COMPONENT, EVENT, EventDispatcher, SCENE, SPEED } from "./data/constants";
import { globals } from "./data/globals";

enum ANGLE{
    LIE = -90,
    LOSS = 130
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class StickController extends cc.Component {

    @property
    stickWidth: number = 10;
    stickHeight: number = 0;

    rotationAngle: number = 0;
    isGrowing = false
    wasTouched = false
    isTouching = false
    isLoss = false

    onLoad () {
        this.reset()
        this.handleEvents()
    }

    handleEvents() {
        EventDispatcher.on(EVENT.TOUCH_START, () => this.isTouching = true, this);
        EventDispatcher.on(EVENT.TOUCH_END, () => this.isTouching = false, this);
        EventDispatcher.on(EVENT.LOSS, () => this.isLoss = true, this)
    }

    init(x: number, y: number, isGrowing: boolean){
        this.node.setPosition(x, y - this.node.width / 2)
        this.isGrowing = isGrowing
    }

    reset(){
        this.stickHeight = 0
        this.node.height = this.stickHeight
        this.node.width = this.stickWidth
        this.node.anchorY = 0;
        this.node.angle = 0;

        this.rotationAngle = 0;
        this.isGrowing = false;
        this.wasTouched = false;
    }

    update (dt) {
        switch(globals.whatMoving){
            case COMPONENT.PLATFORMS:
                this.node.x -= SPEED.MIDDLE * dt
                break;
            case COMPONENT.STICK: 
                this.handleStick(dt)
                break;
        }

        if(this.isLoss) this.loss(dt)
        
        this.updateCollider()   
    }

    updateCollider(){
        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;
        collider.offset.y = this.node.height / 2
        collider.apply();
    }

    handleStick(dt){
        const isStickGrowing = this.isTouching && this.isGrowing && !this.rotationAngle
        if(isStickGrowing) {
            this.growStick(dt)
        }
        else if(this.wasTouched){
            this.lieStick(dt)
        }
    }

    growStick(dt){
        this.stickHeight += SPEED.MIDDLE * dt;
        this.node.height = this.stickHeight
        this.wasTouched = true
    }

    lieStick(dt){
        this.rotationAngle -= SPEED.SLOW * dt;
        this.node.angle = this.rotationAngle;
        
        if (this.node.angle <= ANGLE.LIE) {
            this.node.angle = ANGLE.LIE
            this.isGrowing = false
            this.wasTouched = false
            globals.whatMoving = COMPONENT.HERO
        }
    }

    loss(dt){
        this.rotationAngle -= SPEED.FAST * dt;
        this.node.angle = this.rotationAngle;
        if(this.rotationAngle <= ANGLE.LOSS) cc.director.loadScene(SCENE.FINISH);
    }
}
