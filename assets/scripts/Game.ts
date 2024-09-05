import { EVENT, EventDispatcher } from "./data/constants";
import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Node)
    hero: cc.Node = null;

    @property(cc.Label)
    scoreLabel: cc.Label;

    @property(cc.AudioClip)
    lossSound: cc.AudioClip;

    onLoad () {
        this.init()
        EventDispatcher.on(EVENT.LOSS, this.loss)
    }

    start () {
        
    }

    init(){
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_joinBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        this.handleManagar()
        this.handleTouch()
    }

    handleManagar(){
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true

        const collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true
    }

    handleTouch(){
        this.node.on(cc.Node.EventType.TOUCH_START, () => EventDispatcher.emit(EVENT.TOUCH_START), this);
        this.node.on(cc.Node.EventType.TOUCH_END, () => EventDispatcher.emit(EVENT.TOUCH_END), this);
    }

    update (dt) {
        this.scoreLabel.string = `Score:\n${globals.score}`;
    }

    loss(){
        cc.audioEngine.stopAllEffects()
        cc.audioEngine.playEffect(this.lossSound, false);
    }
}
