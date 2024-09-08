import { SCENE } from "./data/constants";
import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FinishController extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label;

    @property(cc.Label)
    recordLabel: cc.Label;

    @property(cc.Button)
    restartButton: cc.Button;

    onLoad() {
        this.restartButton.node.on(cc.Node.EventType.TOUCH_END, this.switchScene, this);
    }

    start () {
        const isRecordNeedUpdate = !globals.record || globals.score > globals.record
        if (isRecordNeedUpdate) {
            globals.record = globals.score;
        }

        this.scoreLabel.string = `Score:\n${globals.score}`;
        this.recordLabel.string = `Best Score:\n${globals.record}`;
    }

    switchScene(){
        cc.director.loadScene(SCENE.START);
    }
}