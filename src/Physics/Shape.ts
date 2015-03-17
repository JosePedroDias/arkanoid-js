///<reference path="../../ext/box2dweb.d.ts" />
///<reference path="World.ts" />
///<reference path="../Engine/Item.ts" />

module Physics {

    import BBody = Box2D.Dynamics.b2Body;
    import BBodyDef = Box2D.Dynamics.b2BodyDef;
    import BFixtureDef = Box2D.Dynamics.b2FixtureDef;
    import BWorld = Box2D.Dynamics.b2World;
    import BCircleShape = Box2D.Collision.Shapes.b2CircleShape;
    import BPolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    import BVec2 = Box2D.Common.Math.b2Vec2;

    export interface ShapeCtorOpts {
        dims? : number[];
        r?    : number;

        density?     : number;
        friction?    : number;
        restitution? : number;

        isStatic? : boolean;

        pos ? : number[];

        data? : any;

        visual? : Engine.Item;
    }

    export class Shape {
        _visual : Engine.Item;
        _body   : BBody;

        constructor(w : World , o : ShapeCtorOpts) {
            this._visual = o.visual;

            var fixDef = new BFixtureDef();
            fixDef.density     = o.density     || 1; // influences weight of the shape
            fixDef.friction    = o.friction    || 0; // what gets lost on movement
            fixDef.restitution = o.restitution || 0.5; // what gets lost on collision

            var bodyDef = new BBodyDef();
            bodyDef.type = o.isStatic ? BBody.b2_staticBody : BBody.b2_dynamicBody;

            if ('pos' in o) {
                bodyDef.position.x = o.pos[0];
                bodyDef.position.y = o.pos[1];
            }

            if ('r' in o) {
                fixDef.shape = new BCircleShape(o.r); // r
            }
            else if ('dims' in o) {
                fixDef.shape = new BPolygonShape();
                var s : BPolygonShape = <BPolygonShape>fixDef.shape;
                s.SetAsBox(o.dims[0]/2, o.dims[1]/2); // half w, half h
            }
            else {
                throw 'either radius or dims must be provided!';
            }

            var ww = w._w;
            this._body = ww.CreateBody(bodyDef);
            this._body.CreateFixture(fixDef);

            if ('data' in o) {
                this._body.SetUserData(o.data);
            }
        }

        applyImpulse(dir : number[], strength? : number) {
            var imp = new BVec2(dir[0], dir[1]);
            if (strength) {
                imp.Normalize();
                imp.Multiply(strength);
            }
            this._body.ApplyImpulse(imp, this._body.GetPosition()); // forceDir in  N-seconds or kg-m/s, center of application
        }

    }

}
