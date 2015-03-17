/// <reference path="../../ext/box2dweb.d.ts" />

module Physics {

    import BWorld = Box2D.Dynamics.b2World;
    import BVec2 = Box2D.Common.Math.b2Vec2;
    import BContactListener = Box2D.Dynamics.b2ContactListener;
    import BContact = Box2D.Dynamics.Contacts.b2Contact;

    export class World {
        _w  : BWorld;
        _cb : Function;
        _cl : BContactListener;

        constructor(gravity : number[], cb? : Function) {
            this._w = new BWorld( new BVec2(gravity[0], gravity[1]), true ); // gravity, doSleep

            if (!cb) { return; }

            this._cb = cb;
            this._cl = new BContactListener();
            this._cl.BeginContact = function(contact : BContact) {
                var a = contact.GetFixtureA().GetBody();
                var b = contact.GetFixtureB().GetBody();
                var udA = a.GetUserData();
                var udB = b.GetUserData();
                cb(udA, udB);
            };
            this._w.SetContactListener( this._cl );
        }

        update(dt : number) {
            this._w.Step(dt * 10, 10, 10); // box2D step - step duration in secs, vel iters, pos iters
            this._w.ClearForces();
        }

    }

}
