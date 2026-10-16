// 2472041 - Rico Dharmawan

import { PhysicsEngine } from "../../../lib/engine/physicsEngine.js";
import { graphicsLib } from "../../../lib/graphics/graphicsLib.js";
import { GameObject } from "../../../lib/engine/object.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });
let angle = 0;

let angles = [];

const GrafLib = new graphicsLib(context, canvas_handler);
const engine = new PhysicsEngine(1 / 60, GrafLib);

const gun_center = GrafLib.getCentroid([
    GrafLib.Util.Vector2(30, 475),
    GrafLib.Util.Vector2(80, 475),
    GrafLib.Util.Vector2(80, 455),
    GrafLib.Util.Vector2(30, 455)
]);
// const gun = new GameObject()
//     .setName("Gun")
//     .setVertices([
//         GrafLib.Util.Vector2(-25, 10),
//         GrafLib.Util.Vector2(25, 10),
//         GrafLib.Util.Vector2(25, -10),
//         GrafLib.Util.Vector2(-25, -10)
//     ])
//     .setPosition(gun_center)
//     .setFills([
//         GrafLib.Coloring.createFillInfo("BF", [GrafLib.Util.Color(150, 150, 150), GrafLib.Util.Color(0, 0, 0)], GrafLib.Util.Vector2(0, 0))
//     ]);

// engine.addObject(gun, 1);

// engine.start();

// canvas_handler.addEventListener('mousemove', function(e) {
//     let mouseX = e.offsetX;
//     let mouseY = e.offsetY;

//     const gun_anchor = gun.position;

//     angle = Math.atan2(gun_anchor.y - mouseY, gun_anchor.x - mouseX) + Math.PI - (2 * Math.PI);

//     gun.updateRotation(angle);
// });

// canvas_handler.addEventListener('click', function() {
//     angles.push(angle);

//     let x = gun.position.x + 25 * Math.cos(angle);
//     let y = gun.position.y + 25 * Math.sin(angle);

//     let vx = 10 * Math.cos(angle);
//     let vy = 10 * Math.sin(angle);

//     const bullet = new GameObject()
//         .setName("bullet")
//         .setVertices([
//             GrafLib.Util.Vector2(0, 0)
//         ])
//         .setRadius(5)
//         .setColor(GrafLib.Util.Color(255, 0, 0))
//         .setPosition(GrafLib.Util.Vector2(x, y))
//         .setVelocity(GrafLib.Util.Vector2(vx, vy))
//         .setFills([
//             GrafLib.Coloring.createFillInfo("BF", [GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0)], GrafLib.Util.Vector2(0, 0))
//         ]);

//     engine.addObject(bullet)
// });

engine.start()

// top right
// const bullet = new GameObject()
//     .setName("bullet")
//     .setVertices([
//         GrafLib.Util.Vector2(0, 0)
//     ])
//     .setRadius(5)
//     .setColor(GrafLib.Util.Color(255, 0, 0))
//     .setPosition(GrafLib.Util.Vector2(504, -3))
//     .setFills([
//         GrafLib.Coloring.createFillInfo("BF", [GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0)], GrafLib.Util.Vector2(0, 0))
//     ]);

// bottom left
// const bullet = new GameObject()
//     .setName("bullet")
//     .setVertices([
//         GrafLib.Util.Vector2(0, 0)
//     ])
//     .setRadius(5)
//     .setColor(GrafLib.Util.Color(255, 0, 0))
//     .setPosition(GrafLib.Util.Vector2(-3, 504))
//     .setFills([
//         GrafLib.Coloring.createFillInfo("BF", [GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0)], GrafLib.Util.Vector2(0, 0))
//     ]);

// bottom right
const bullet = new GameObject()
    .setName("bullet")
    .setVertices([
        GrafLib.Util.Vector2(0, 0)
    ])
    .setRadius(5)
    .setColor(GrafLib.Util.Color(255, 0, 0))
    .setPosition(GrafLib.Util.Vector2(503, 503))
    .setFills([
        GrafLib.Coloring.createFillInfo("BF", [GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0)], GrafLib.Util.Vector2(0, 0))
    ]);

engine.addStaticObject(bullet, 0);