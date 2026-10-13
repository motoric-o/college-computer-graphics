// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);

GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(350, 450),
    GrafLib.Util.Coordinate(150, 450),
    GrafLib.Util.Coordinate(170, 400),
    GrafLib.Util.Coordinate(330, 400)
], GrafLib.Util.Color(0, 0, 0));

GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 425), GrafLib.Util.Color(50, 50, 125));

GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(225, 400),
    GrafLib.Util.Coordinate(275, 400),
    GrafLib.Util.Coordinate(275, 250),
    GrafLib.Util.Coordinate(225, 250)
], GrafLib.Util.Color(0, 0, 0));

GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 300), GrafLib.Util.Color(150, 150, 150));

GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(250, 150), 100, GrafLib.Util.Color(0, 0, 0));
GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(250, 150), 90, GrafLib.Util.Color(0, 0, 0));

GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 245), GrafLib.Util.Color(150, 150, 150));

GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(250, 150), 10, GrafLib.Util.Color(0, 0, 0));
GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 150), GrafLib.Util.Color(0, 0, 0));

// Top
GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(250, 140),
    GrafLib.Util.Coordinate(270, 70),
    GrafLib.Util.Coordinate(230, 70)
], GrafLib.Util.Color(0, 0, 0))

// Bottom
GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(250, 160),
    GrafLib.Util.Coordinate(270, 230),
    GrafLib.Util.Coordinate(230, 230)
], GrafLib.Util.Color(0, 0, 0))

// Left
GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(240, 150),
    GrafLib.Util.Coordinate(170, 130),
    GrafLib.Util.Coordinate(170, 170)
], GrafLib.Util.Color(0, 0, 0))

// Right
GrafLib.Shapes.polygon([
    GrafLib.Util.Coordinate(260, 150),
    GrafLib.Util.Coordinate(330, 130),
    GrafLib.Util.Coordinate(330, 170)
], GrafLib.Util.Color(0, 0, 0))

GrafLib.context.putImageData(GrafLib.image_data, 0, 0);
