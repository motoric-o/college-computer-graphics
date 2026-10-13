// 2472041 - Rico Dharmawan

import { grafLib } from "../lib/index.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

const GrafLib = new grafLib(image_data);

GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(100, 100), 50, GrafLib.Util.Color(0, 255, 0, 255));
GrafLib.Coloring.boundaryFill(GrafLib.Util.Coordinate(100, 100), GrafLib.Util.Color(255, 0, 0, 255), GrafLib.Util.Color(0, 255, 0, 255));

GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(300, 300), 50, GrafLib.Util.Color(0, 0, 255));
GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(300, 300), GrafLib.Util.Color(255, 255, 0))

context.putImageData(image_data, 0, 0);