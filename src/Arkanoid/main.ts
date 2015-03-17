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

    var paddleIt = new Engine.RectItem({  pos:[ 30, 20], dims:[50, 50], color:'#F00'});
    var ballIt   = new Engine.CircleItem({pos:[220, 20], r:10,          color:'#00F'});
    var brickIt  = new Engine.RectItem({  pos:[120, 20], dims:[50, 25], color:'#0F0'});
    stage.addItem(paddleIt);
    stage.addItem(ballIt);
    stage.addItem(brickIt);

    var world = new Physics.World(function() {});

    var shapesToTrack : Physics.Shape[] = [];

    // DYNAMIC SHAPES
    var paddleSh = new Physics.Shape(world, {
        pos:    paddleIt._pos,
        dims:   paddleIt._dims,
        visual: paddleIt,
        data:   'PADDLE'
    });
    var ballSh = new Physics.Shape(world, {
        pos:    ballIt._pos,
        r:      ballIt._r,
        visual: ballIt,
        data:   'BALL'
    });
    var brickSh = new Physics.Shape(world, {
        pos:    brickIt._pos,
        dims:   brickIt._dims,
        visual: brickIt,
        data:   'BRICK'
    });
    shapesToTrack.push(paddleSh);
    shapesToTrack.push(ballSh);
    shapesToTrack.push(brickSh);

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
