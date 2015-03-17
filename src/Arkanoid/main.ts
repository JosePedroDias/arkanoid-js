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

    var paddleIt = new Engine.RectItem({  pos:[W/2, H*0.9], dims:[64, 16], color:'#F00'});
    var ballIt   = new Engine.CircleItem({pos:[W/2, H/2],   r:8,           color:'#00F'});
    var brickIt  = new Engine.RectItem({  pos:[W/2, H*0.2], dims:[32, 16], color:'#0F0'});
    stage.addItem(paddleIt);
    stage.addItem(ballIt);
    stage.addItem(brickIt);

    var world = new Physics.World(
        [0, 0], // gravity
        function(a, b) { // contact listener
            if (a === 'BOTTOM' || b === 'BOTTOM') {
                stage.stop();
                window.alert('GAME OVER');
            }
            //console.log( [a, b].join(' | ') );
        }
    );

    var shapesToTrack : Physics.Shape[] = [];

    // DYNAMIC SHAPES
    var paddleSh = new Physics.Shape(world, {
        pos:      paddleIt._pos,
        dims:     paddleIt._dims,
        visual:   paddleIt,
        isStatic: true,
        data:     'PADDLE'
    });
    var ballSh = new Physics.Shape(world, {
        pos:      ballIt._pos,
        r:        ballIt._r,
        visual:   ballIt,
        data:     'BALL'
    });

    ballSh.applyImpulse([ (Math.random() - 0.5) * 100, 10000]);
    var brickSh = new Physics.Shape(world, {
        pos:    brickIt._pos,
        dims:   brickIt._dims,
        visual: brickIt,
        isStatic: true,
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

        var x = mouse._pos[0];
        var w = paddleIt._dims[0]/2;
        if      (x < w    ) { x =     w; }
        else if (x > W - w) { x = W - w; }
        paddleSh._body.SetPosition( new BVec2(x, paddleSh._body.GetPosition().y) );

        var lv : BVec2 = ballSh._body.GetLinearVelocity();
        lv.Multiply(5);
        ballSh._body.SetLinearVelocity(lv);
    });

    //stage.render();
    stage.run();

}
