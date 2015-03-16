/// <reference path="../../ext/box2dweb.d.ts" />
/// <reference path="World.ts" />

module Physics {

    import BBody = Box2D.Dynamics.b2Body;
    import BBodyDef = Box2D.Dynamics.b2BodyDef;
    import BFixtureDef = Box2D.Dynamics.b2FixtureDef;
    import BWorld = Box2D.Dynamics.b2World;
    import BCircleShape = Box2D.Collision.Shapes.b2CircleShape;
    import BPolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    interface ShapeCtorOpts {
        dims? : number[];
        radius? : number;

        density? : number;
        friction? : number;
        restitution? : number;

        isStatic? : boolean;

        position? : number[];

        data? : any;
    }

    export class Shape {

        constructor(w : BWorld , o : ShapeCtorOpts) {
            var fixDef = new BFixtureDef();
            fixDef.density     = o.density     || 1.0;
            fixDef.friction    = o.friction    || 0.5;
            fixDef.restitution = o.restitution || 0.2;

            var bodyDef = new BBodyDef();
            bodyDef.type = o.isStatic ? BBody.b2_staticBody : BBody.b2_dynamicBody;

            if ('position' in o) {
                bodyDef.position.x = o.position[0];
                bodyDef.position.y = o.position[1];
            }

            if ('radius' in o) {
                fixDef.shape = new BCircleShape(o.radius); // r
            }
            else if ('dims' in o) {
                fixDef.shape = new BPolygonShape();
                var s : BPolygonShape = <BPolygonShape>fixDef.shape;
                s.SetAsBox(o.dims[0]/2, o.dims[1]/2); // half w, half h
            }
            else {
                throw 'either radius or dims must be provided!';
            }

            var body = w.CreateBody(bodyDef);
            body.CreateFixture(fixDef);

            if ('data' in o) {
                body.SetUserData(o.data);
            }
        }

    }

}
