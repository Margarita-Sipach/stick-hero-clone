// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { globals } from "./data/globals";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    stickWidth: number = 10;
    stickHeight: number = 0;

    isKeyPressed = false
    rotationAngle: number = 0;
    isActive = false
    isGrowing = false
    wasTouched = false
    isHeroGo = false

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reset()
    }

    start () {

    }

    init(x, y, isGrowing){
        this.node.setPosition(x, y - this.node.width / 2)
        this.isGrowing = isGrowing
    }

    reset(){
        this.stickHeight = 0

        this.node.height = this.stickHeight
        this.node.width = this.stickWidth
        this.node.anchorY = 0;
        this.node.angle = 0;

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.height = this.node.height;
        collider.size.width = this.node.width;

        collider.apply();
    }

    update (dt) {
        switch(globals.whatMoving){
            case 'hero': 
                break;
            case 'platforms':
                this.node.x -= 150 * dt
                break;
            case 'stick': 
                if(globals.isTouching && this.isGrowing) {
                    this.stickHeight += 5;
                    this.node.height = this.stickHeight
                    this.wasTouched = true
                }
                else if(!globals.isTouching && this.wasTouched){
                    this.rotationAngle -= 2;
                    this.node.angle = this.rotationAngle;
                    
                    if (this.node.angle <= -90) {
                        this.node.angle = -90
                        this.isGrowing = false
                        this.wasTouched = false
                        globals.whatMoving = 'hero'
                    }
                }
                break;
        }
        
        

        let collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;
        collider.offset.y = this.node.height / 2

        collider.apply();
    }
}
