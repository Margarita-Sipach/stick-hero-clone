import { EVENT, EventDispatcher } from "./data/constants";
import { globals } from "./data/globals";

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
            case 'platforms':
                this.node.x -= 150 * dt
                break;
            case 'stick': 
                this.handleStick()
                break;
        }

        if(this.isLoss) this.loss()
        
        this.updateCollider()   
    }

    updateCollider(){
        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;
        collider.offset.y = this.node.height / 2
        collider.apply();
    }

    handleStick(){
        if(this.isTouching && this.isGrowing && !this.rotationAngle) {
            this.growStick()
        }
        else if(this.wasTouched){
            this.lieStick()
        }
    }

    growStick(){
        this.stickHeight += 5;
        this.node.height = this.stickHeight
        this.wasTouched = true
    }

    lieStick(){
        this.rotationAngle -= 2;
        this.node.angle = this.rotationAngle;
        
        if (this.node.angle <= -90) {
            this.node.angle = -90
            this.isGrowing = false
            this.wasTouched = false
            globals.whatMoving = 'hero'
        }
    }

    loss(){
        this.rotationAngle -= 2;
        this.node.angle = this.rotationAngle;
        if(this.rotationAngle <= -130) cc.director.loadScene('Finish');
    }
}
