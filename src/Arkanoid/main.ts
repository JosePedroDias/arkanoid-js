/// <reference path="../Engine/Stage.ts" />
/// <reference path="../Engine/RectItem.ts" />
/// <reference path="../Engine/CircleItem.ts" />

// tsc -t ES5 --sourcemap main.ts --out ~/Work/arkanoid/build/arkanoid.js

module Arkanoid {

    // so TS doesn't nag about these properties below
    interface Document {
        innerWidth  : Number;
        innerHeight : Number;
    }

    var stage = new Engine.Stage({
        dims: [400, 300],
        parent: document.body
    });

    var it1 = new Engine.RectItem([30, 20], [50, 50], '#F00');
    var it2 = new Engine.RectItem([50, 20], [50, 10], '#0F0');
    var it3 = new Engine.CircleItem(20, [50, 90], '#00F');
    stage.addItem(it1);
    stage.addItem(it2);
    stage.addItem(it3);

    stage.render();

}