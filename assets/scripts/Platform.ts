import { COMPONENT } from "./data/constants";
import { globals } from "./data/globals";
import { ScreenParams } from "./data/screen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlatformController extends cc.Component {

    @property(cc.Prefab)
    stick: cc.Prefab = null;

    currentStick: any;
    status: 'from' | 'to'

    isContactHero = false

    start () {
        this.createStick()
    }

    init(width: number, x: number){
        this.node.setPosition(cc.v2(x, ScreenParams.bottom));
        this.node.width = width;

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;

        collider.apply();
    }

    onBeginContact(contact, selfCollider, otherCollider){
        cc.log(otherCollider.node.name, globals.whatMoving === 'stick')
        if(otherCollider.node.name === 'Hero' && this.status === 'to') {
            const label = this.node.getChildByName('label')
            this.node.removeChild(label)
        }
        this.isContactHero = otherCollider.node.name === 'hero'
    }

    onEndContact(contact, selfCollider, otherCollider){
        this.isContactHero = !(otherCollider.node.name === 'hero')
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
                
                if(platformLeft <= ScreenParams.left && this.status === 'from' && globals.isPlatformHide){
                    globals.whatMoving = 'stick'
                }
                if(this.status === 'to' && globals.isPlatformHide){
                    this.currentStick.reset()
                }
            case 'stick':
                
        }
    }
}

