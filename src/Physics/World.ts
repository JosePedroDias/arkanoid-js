/// <reference path="../../ext/box2dweb.d.ts" />

module Physics {

    import BWorld = Box2D.Dynamics.b2World;
    import BVec2 = Box2D.Common.Math.b2Vec2;

    export class World {
        _w: BWorld;

        constructor() {
            this._w = new BWorld( new BVec2(0, 0), true ); // gravity, doSleep
        }

    }

}
