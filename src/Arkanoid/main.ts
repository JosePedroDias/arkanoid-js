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
    var SCORE = 0;
    var el = document.body;
    var scoreEl = document.querySelector('.score');

    var updateScore = function(txt : string) {
        scoreEl.firstChild.nodeValue = txt;
    };

    var stage = new Engine.Stage({
        dims:   [W, H],
        parent: el
    });

    var paddleSh : Physics.Shape;
    var ballSh   : Physics.Shape;

    var paddleIt = new Engine.RectItem({  pos:[W/2, H*0.9], dims:[64, 16], color:'#D22'});
    var ballIt   = new Engine.CircleItem({pos:[W/2, H/2],   r:8,           color:'#DDD'});
    stage.addItem(paddleIt);
    stage.addItem(ballIt);

    var brickShapes = {};

    var shapesToTrack : Physics.Shape[] = [];

    var world = new Physics.World(
        [0, 0], // gravity
        function(a : string, b : string) { // contact listener
            if (a === 'BOTTOM' || b === 'BOTTOM') {
                stage.stop();
                return updateScore('GAME OVER');
            }

            if (a === 'PADDLE' || b === 'PADDLE') {
                var dx = ballIt._pos[0] - paddleIt._pos[0];
                //setTimeout(function() {
                    var v : number = ballSh._body.GetLinearVelocity().Length();
                    ballSh.applyImpulse([v*dx*500*stage._dt, 0]);
                //});
            }

            var brickData : string;
            if (a.indexOf('BRICK ') === 0) {
                brickData = a;
            }
            else if (b.indexOf('BRICK ') === 0) {
                brickData = b;
            }
            else {
                return;
            }

            var id = brickData.split(' ')[1];

            setTimeout(function() { // bodies can only be destroyed after collision phase
                var id = this.id;

                var brickSh:Physics.Shape = brickShapes[id];
                var brickIt:Engine.RectItem = <Engine.RectItem>brickSh._visual;

                stage.removeItem(brickIt);

                delete brickShapes[id];

                var idx = shapesToTrack.indexOf(brickSh);
                if (idx !== -1) {
                    shapesToTrack.splice(idx, 1);
                }

                brickSh.destroy();

                ++SCORE;
                updateScore('' + SCORE);
            }.bind({id:id}), 0);
        }
    );

    // DYNAMIC SHAPES
    paddleSh = new Physics.Shape(world, {
        pos:      paddleIt._pos,
        dims:     paddleIt._dims,
        visual:   paddleIt,
        isStatic: true,
        data:     'PADDLE'
    });
    shapesToTrack.push(paddleSh);
    ballSh = new Physics.Shape(world, {
        pos:      ballIt._pos,
        r:        ballIt._r,
        visual:   ballIt,
        data:     'BALL'
    });
    ballSh.applyImpulse([ (Math.random() - 0.5) * 100, 10000]);
    shapesToTrack.push(ballSh);

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

    // BRICKS
    var brickIt : Engine.RectItem;
    var brickSh : Physics.Shape;
    var pos  : number[];
    var dims : number[] = [32, 16];
    var i = 0;
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 9; ++x) {
            pos = [
                (y % 2 ? 32 : 52) + x * (dims[0] + 8),
                         16       + y * (dims[1] + 8)
            ];
            brickIt = new Engine.RectItem({
                pos:   pos,
                dims:  dims,
                color: ['rgb(', ~~(Math.random() * 256), ',', ~~(Math.random() * 256), ',', ~~(Math.random() * 256), ')'].join('')
            });
            brickSh = new Physics.Shape(world, {
                pos:      pos,
                dims:     dims,
                visual:   brickIt,
                isStatic: true,
                data:     'BRICK ' + i
            });
            stage.addItem(brickIt);
            shapesToTrack.push(brickSh);
            brickShapes[i] = brickSh;
            ++i;
        }
    }


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

        var v : BVec2 = ballSh._body.GetLinearVelocity();
        v.Multiply(150000 * stage._dt);
        ballSh._body.SetLinearVelocity(v);
    });

    //stage.render();
    stage.run();

}
