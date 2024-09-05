import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FinishController extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    recordLabel: cc.Label = null;

    @property(cc.Button)
    restartButton: cc.Button = null;

    start () {
        if (!globals.record || globals.score > globals.record) {
            globals.record = globals.score;
        }

        this.scoreLabel.string = `Score:\n${globals.score}`;
        this.recordLabel.string = `Best Score:\n${globals.record}`;

        this.restartButton.node.on(cc.Node.EventType.TOUCH_END, this.switchScene, this);
    }

    switchScene(){
        cc.director.loadScene('Start');
    }
}