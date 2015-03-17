/// <reference path="../../ext/box2dweb.d.ts" />

module Physics {

    import BWorld = Box2D.Dynamics.b2World;
    import BVec2 = Box2D.Common.Math.b2Vec2;
    import ContactListener = Box2D.Dynamics.b2ContactListener;

    export class World {
        _w  : BWorld;
        _cb : Function;
        _cl : ContactListener;

        constructor(cb : Function) {
            this._w = new BWorld( new BVec2(0, 9.8), true ); // gravity, doSleep
            this._cb = cb;
            this._cl = new ContactListener();
            this._w.SetContactListener( this._cl );
            this._cl.BeginContact( this._onContact.bind(this) );
        }

        _onContact(contact) {
            var a = contact.GetFixtureA().GetBody();
            var b = contact.GetFixtureB().GetBody();
            //var ud = p.GetUserData();
        }

        update(dt : number) {
            this._w.Step(dt * 10, 10, 10); // box2D step - step duration in secs, vel iters, pos iters
            this._w.ClearForces();
        }

    }

}
