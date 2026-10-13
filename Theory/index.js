// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);

let array_titik = [
    GrafLib.Util.Coordinate(100, 100),
    GrafLib.Util.Coordinate(100, 200),
    GrafLib.Util.Coordinate(200, 200)
];

let array_titik2 = GrafLib.Transform.translate_multiple(array_titik, GrafLib.Util.Coordinate(1, 1));
// GrafLib.Shapes.polygon(array_titik2, GrafLib.Util.Color(255, 0, 0));

// let scaled = GrafLib.Transform.scale_multiple(array_titik, 2);
// GrafLib.Shapes.polygon(scaled, GrafLib.Util.Color(255, 0, 0));

// let rotated = GrafLib.Transform.rotate_multiple(scaled, 45);
// GrafLib.Shapes.polygon(rotated, GrafLib.Util.Color(255, 0, 0));

function drawFrame() {
    GrafLib.refreshScreen();
    array_titik2 = GrafLib.Transform.rotate_multiple(array_titik2, 0.1, GrafLib.Util.Coordinate(150, 150));
    GrafLib.Shapes.polygon(array_titik2, GrafLib.Util.Color(255, 0, 0));
    context.putImageData(GrafLib.image_data, 0, 0);
    requestAnimationFrame(drawFrame);
}

drawFrame();

// setInterval(function() {
//     GrafLib.clearScreen();
//     array_titik2 = GrafLib.Transform.translate_multiple(array_titik2, GrafLib.Util.Coordinate(1, 1));
//     GrafLib.Shapes.polygon(array_titik2, GrafLib.Util.Color(255, 0, 0));
//     context.putImageData(GrafLib.image_data, 0, 0);
// }, 16.67)
