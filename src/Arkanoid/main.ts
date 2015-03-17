///<reference path="../Engine/Stage.ts" />
///<reference path="../Engine/RectItem.ts" />
///<reference path="../Engine/CircleItem.ts" />
///<reference path="../Physics/World.ts" />
///<reference path="../Physics/Shape.ts" />
///<reference path="../Input/Mouse.ts" />
///<reference path="../../ext/box2dweb.d.ts" />

// tsc -t ES5 --removeComments --sourcemap main.ts --out ~/Work/arkanoid/build/main.js

module Arkanoid {

    import BVec2 = Box2D.Common.Math.b2Vec2;

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

    var it1 = new Engine.RectItem({  pos:[ 30, 20], dims:[50, 50], color:'#F00'});
    var it2 = new Engine.RectItem({  pos:[120, 20], dims:[50, 25], color:'#0F0'});
    var it3 = new Engine.CircleItem({pos:[220, 20], r:10,          color:'#00F'});
    stage.addItem(it1);
    stage.addItem(it2);
    stage.addItem(it3);

    var shapesToTrack : Physics.Shape[] = [];

    var world = new Physics.World(function() {});

    // DYNAMIC SHAPES
    var sh1 = new Physics.Shape(world, {
        pos:    it1._pos,
        dims:   it1._dims,
        visual: it1
    });
    var sh2 = new Physics.Shape(world, {
        pos:    it2._pos,
        dims:   it2._dims,
        visual: it2
    });
    var sh3 = new Physics.Shape(world, {
        pos:    it3._pos,
        r:      it3._r,
        visual: it3
    });
    shapesToTrack.push(sh1);
    shapesToTrack.push(sh2);
    shapesToTrack.push(sh3);

    // STATIC WALLS
    var l = 10;
    new Physics.Shape(world, {
        pos:      [W/2, -l],
        dims:     [W,   l*2],
        isStatic: true,
        data:     'TOP'
    });
    new Physics.Shape(world, {
        pos:      [W/2, H+l],
        dims:     [W,   l*2],
        isStatic: true,
        data:     'BOTTOM'
    });
    new Physics.Shape(world, {
        pos:      [-l, H/2],
        dims:     [l*2, H],
        isStatic: true,
        data:     'LEFT'
    });
    new Physics.Shape(world, {
        pos:      [W+l, H/2],
        dims:     [l*2, H],
        isStatic: true,
        data:     'RIGHT'
    });



    var mouse = new Input.Mouse( el.querySelector('canvas') );
    mouse.setup();

    stage.setOnUpdate(function() {
        var dt = this._dt;

        world.update(dt);

        shapesToTrack.forEach(function(shape : Physics.Shape) {
            var item = shape._visual;
            var p : BVec2 = shape._body.GetPosition();

            if ('_r' in item) {
                var c : Engine.CircleItem = <Engine.CircleItem>item;
                c._pos[0] = p.x;
                c._pos[1] = p.y;
            }
            else {
                var r : Engine.RectItem = <Engine.RectItem>item;
                r._pos[0] = p.x;
                r._pos[1] = p.y;
                r._rot = shape._body.GetAngle();
            }
        });

        //it1._pos[0] += 100 * dt;
        //it1._rot += 1 * dt;
        //it2._pos[1] += 50 * dt;
        //it3._pos[0] = mouse._pos[0];
        //console.log('t:%s | dt:%s', this._t.toFixed(3), this._dt.toFixed(3));
    });

    //stage.render();
    stage.run();

}
