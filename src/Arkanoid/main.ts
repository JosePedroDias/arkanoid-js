///<reference path="../Engine/Stage.ts" />
///<reference path="../Engine/RectItem.ts" />
///<reference path="../Engine/CircleItem.ts" />
///<reference path="../Physics/World.ts" />
///<reference path="../Physics/Shape.ts" />
///<reference path="../Input/Mouse.ts" />

// tsc -t ES5 --removeComments --sourcemap main.ts --out ~/Work/arkanoid/build/main.js

module Arkanoid {

    // so TS doesn't nag about these properties below
    interface Document {
        innerWidth  : number;
        innerHeight : number;
    }

    var W = 400;
    var H = 300;
    var el = document.body;

    var stage = new Engine.Stage({
        dims:   [W, H],
        parent: el
    });

    var it1 = new Engine.RectItem({  pos:[30, 20], dims:[50, 50], color:'#F00'});
    var it2 = new Engine.RectItem({  pos:[60, 20], dims:[50, 25], color:'#0F0'});
    var it3 = new Engine.CircleItem({pos:[90, 20], r:10,          color:'#00F'});
    stage.addItem(it1);
    stage.addItem(it2);
    stage.addItem(it3);

    var world = new Physics.World();
    var sh1 = new Physics.Shape(world, {
        dims: [30, 30],
        pos:  [W/2, H/2]
    });

    var mouse = new Input.Mouse( el.querySelector('canvas') );
    mouse.setup();

    stage.setOnUpdate(function() {
        var dt = this._dt;
        it1._pos[0] += 100 * dt;
        it2._pos[1] += 50 * dt;
        it3._pos[0] = mouse._pos[0];
        //console.log('t:%s | dt:%s', this._t.toFixed(3), this._dt.toFixed(3));
    });

    //stage.render();
    stage.run();

}
