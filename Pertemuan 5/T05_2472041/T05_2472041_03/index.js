// 2472041 - Rico Dharmawan

import { TaskClass } from "../../../lib/engine/task.js";
import { graphicsLib } from "../../../lib/graphics/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });
let angle = 0;

const GrafLib = new graphicsLib(context, canvas_handler);
const Task = new TaskClass();


console.log(threads.getItem(0))

let gun_coords = [
    GrafLib.Util.Coordinate(30, 475),
    GrafLib.Util.Coordinate(80, 475),
    GrafLib.Util.Coordinate(80, 455),
    GrafLib.Util.Coordinate(30, 455)
];

let gun_anchor = GrafLib.getCentroid([
    GrafLib.Util.Coordinate(30, 475),
    GrafLib.Util.Coordinate(80, 475),
    GrafLib.Util.Coordinate(80, 455),
    GrafLib.Util.Coordinate(30, 455)
]);

let angles = []
let bulletPos = gun_anchor;
let bulletDist = 25;

GrafLib.Shapes.polygon(gun_coords, GrafLib.Util.Color(0, 0, 0));
GrafLib.putImageData();

function render() {
    GrafLib.refreshScreen();

    rotasi_fp();

    translasi();

    requestAnimationFrame(render);

    GrafLib.putImageData();
}

function translasi(bulletIndex) {
    let x = bulletPos.x + bulletDist * Math.cos(angles[0]);
    let y = bulletPos.y + bulletDist * Math.sin(angles[0]);

    GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(x, y), 5, GrafLib.Util.Color(255, 0, 0));
    GrafLib.Coloring.boundaryFill(GrafLib.Util.Coordinate(x, y), GrafLib.Util.Color(255, 0, 0), GrafLib.Util.Color(255, 0, 0));
    bulletDist += 1;
}

function rotasi_fp() {
    let rotated = GrafLib.Transform.rotate_multiple(gun_coords, angle, gun_anchor)
    GrafLib.Shapes.polygon(rotated, GrafLib.Util.Color(0, 0, 0));
}

canvas_handler.addEventListener('mousemove', function(e) {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    angle = Math.atan2(gun_anchor.y - mouseY, gun_anchor.x - mouseX) + Math.PI - (2 * Math.PI);
});

canvas_handler.addEventListener('click', function() {
    angles.push(angle);
});

render();