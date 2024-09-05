import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartController extends cc.Component {

    @property(cc.Button)
    playButton: cc.Button = null;

    @property(cc.AudioClip)
    music: cc.AudioClip;

    onLoad () {
        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(this.music, true);
        }

        this.managersInit()
    }

    start () {
        this.playButton.node.on(cc.Node.EventType.TOUCH_END, this.switchScene, this);
    }

    managersInit(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true

        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true
    }

    switchScene(){
        globals.score = 0
        cc.director.loadScene('Game');
        globals.whatMoving = 'stick'
    }
}
