import { COMPONENT, EVENT, EventDispatcher } from "./data/constants";
import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label;

    @property(cc.AudioClip)
    lossSound: cc.AudioClip;

    @property(cc.AudioClip)
    successSound: cc.AudioClip;

    onLoad () {
        this.init()
        EventDispatcher.on(EVENT.LOSS, this.loss, this)
        EventDispatcher.on(EVENT.HERO_CAME, this.heroCame, this)
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
        this.node.on(cc.Node.EventType.TOUCH_START, () => EventDispatcher.emit(EVENT.TOUCH_START));
        this.node.on(cc.Node.EventType.TOUCH_END, () => EventDispatcher.emit(EVENT.TOUCH_END));
    }

    update (dt) {
        this.scoreLabel.string = `Score:\n${globals.score}`;
    }

    loss(){
        this.stopAudioEffects()
        cc.audioEngine.playEffect(this.lossSound, false);
    }

    heroCame(){
        globals.score++
        globals.whatMoving = COMPONENT.PLATFORMS
        this.stopAudioEffects()
        cc.audioEngine.playEffect(this.successSound, false);
    }

    stopAudioEffects(){
        cc.audioEngine.stopAllEffects()
    }
}
