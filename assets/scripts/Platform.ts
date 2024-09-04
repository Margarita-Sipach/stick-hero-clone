// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    active: boolean;

    screenRight = cc.winSize.width / 2
    screenLeft = -cc.winSize.width / 2
    screenBottom = -cc.winSize.height / 2

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
    }

    init(width, x){
        this.active = true
        this.node.setPosition(cc.v2(x, this.screenBottom));
        this.node.width = width;

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;
        collider.offset.x = this.node.x;
    }

    update (dt) {
        if(this.active){
            this.node.x -= 150 * dt

            const platformRight = this.node.x + this.node.width;
            
            if(platformRight < this.screenLeft){
                cc.log('angle', platformRight, this.screenLeft)
                this.active = false
            }
        }
    }
}







// // Learn cc.Class:
// //  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// // Learn Attribute:
// //  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// // Learn life-cycle callbacks:
// //  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const tileSize = 64

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         coinsOffsetMin: 50,
//         coinsOffsetMax: 150,
//         tile: {
//             default: null,
//             type: cc.Prefab
//         },
//         diamond: {
//             default: null,
//             type: cc.Prefab
//         }
//     },

//     // LIFE-CYCLE CALLBACKS:

//     // onLoad () {},

//     start () {
//     },

//     init(tilesCount, x, y){
//         this.active = true;
//         this.node.removeAllChildren()
//         this.node.setPosition(cc.v2(x, y));

//         for(let i = 0; i < tilesCount; i++){
//             const tile = cc.instantiate(this.tile);
//             this.node.addChild(tile);
//             tile.setPosition(i * tile.width, 0)
//         }

//         this.node.width = tileSize * tilesCount;
//         this.node.height = tileSize;

//         let collider = this.node.getComponent(cc.PhysicsBoxCollider);
//         collider.size.width = this.node.width;
//         collider.size.height = this.node.height;

//         collider.offset.x = this.node.width / 2 - tileSize / 2;

//         collider.apply();

//         this.createDiamonds()
//     },

//     createDiamonds(){
//         const yOffset = this.coinsOffsetMin + Math.random() * (this.coinsOffsetMax- this.coinsOffsetMin)
//         this.node.children.forEach(tile => {
//             if(Math.random() > 0.4) return
//             const diamond = cc.instantiate(this.diamond)
//             tile.addChild(diamond);
//             diamond.setPosition(0, yOffset)
//         })
//     },

//     update (dt) {
//         if(this.active){
//             this.node.x -= 150 * dt

//             const platformRight = this.node.x + this.node.width;

//             if(platformRight < -cc.winSize.width / 2){
//                 this.active = false
//             }
//         }
//     },
// });











