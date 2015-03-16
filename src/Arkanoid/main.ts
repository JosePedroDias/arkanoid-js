///<reference path="../Engine/Stage.ts" />
///<reference path="../Engine/RectItem.ts" />
///<reference path="../Engine/CircleItem.ts" />
///<reference path="../Physics/World.ts" />
///<reference path="../Physics/Shape.ts" />

// tsc -t ES5 --sourcemap main.ts --out ~/Work/arkanoid/build/arkanoid.js

module Arkanoid {

    // so TS doesn't nag about these properties below
    interface Document {
        innerWidth  : number;
        innerHeight : number;
    }

    var W = 400;
    var H = 300;

    var stage = new Engine.Stage({
        dims:   [W, H],
        parent: document.body
    });

    var it1 = new Engine.RectItem([30, 20], [50, 50], '#F00');
    var it2 = new Engine.RectItem([50, 20], [50, 10], '#0F0');
    var it3 = new Engine.CircleItem(20, [50, 90], '#00F');
    stage.addItem(it1);
    stage.addItem(it2);
    stage.addItem(it3);

    var world = new Physics.World();
    var sh1 = new Physics.Shape(world, {
        dims: [30, 30],
        pos:  [W/2, H/2]
    });

    stage.setOnUpdate(function() {
        var dt = this._dt;
        it1._pos[0] += 100 * dt;
        it2._pos[1] += 50 * dt;
        //console.log('t:%s | dt:%s', this._t.toFixed(3), this._dt.toFixed(3));
    });

    //stage.render();
    stage.run();

}