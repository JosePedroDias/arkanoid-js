/// <reference path="../ext/box2dweb.d.ts" />
/// <reference path="Stage.ts" />
/// <reference path="RectItem.ts" />
/// <reference path="CircleItem.ts" />

// Include the following imports, or add more/less, to reduce the module nesting.
import b2Common = Box2D.Common;
import b2Math = Box2D.Common.Math;
import b2Collision = Box2D.Collision;
import b2Shapes = Box2D.Collision.Shapes;
import b2Dynamics = Box2D.Dynamics;
import b2Contacts = Box2D.Dynamics.Contacts;
import b2Controllers = Box2D.Dynamics.Controllers;
import b2Joints = Box2D.Dynamics.Joints;

var bodyEl = document.body;
//var dims = [bodyEl.innerWidth, bodyEl.innerHeight];
var dims = [400, 300];

var stage = new Stage(dims, bodyEl);

var it1 = new RectItem([30,20], [50, 50], '#F00');
var it2 = new RectItem([50,20], [50, 10], '#0F0');
var it3 = new CircleItem(20, [50, 90], '#00F');
stage.addItem(it1);
stage.addItem(it2);
stage.addItem(it3);

stage.render();
