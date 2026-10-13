// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphics/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);
let fan_coords = [
    GrafLib.Util.Vector2(250, 140),
    GrafLib.Util.Vector2(270, 70),
    GrafLib.Util.Vector2(230, 70),
    GrafLib.Util.Vector2(250, 160),
    GrafLib.Util.Vector2(270, 230),
    GrafLib.Util.Vector2(230, 230),
    GrafLib.Util.Vector2(240, 150),
    GrafLib.Util.Vector2(170, 130),
    GrafLib.Util.Vector2(170, 170),
    GrafLib.Util.Vector2(260, 150),
    GrafLib.Util.Vector2(330, 130),
    GrafLib.Util.Vector2(330, 170)
]
let coloring_coords = [
    GrafLib.Util.Vector2(250, 130),
    GrafLib.Util.Vector2(250, 170),
    GrafLib.Util.Vector2(230, 150),
    GrafLib.Util.Vector2(270, 150)
]
let rotation = 0;

function draw_stand() {
    GrafLib.Shapes.polygon([
        GrafLib.Util.Vector2(350, 450),
        GrafLib.Util.Vector2(150, 450),
        GrafLib.Util.Vector2(170, 400),
        GrafLib.Util.Vector2(330, 400)
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 425), GrafLib.Util.Color(50, 50, 125));

    GrafLib.Shapes.polygon([
        GrafLib.Util.Vector2(225, 400),
        GrafLib.Util.Vector2(275, 400),
        GrafLib.Util.Vector2(275, 250),
        GrafLib.Util.Vector2(225, 250)
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 300), GrafLib.Util.Color(150, 150, 150));

    GrafLib.Shapes.polar_circle(GrafLib.Util.Vector2(250, 150), 100, GrafLib.Util.Color(0, 0, 0));
    GrafLib.Shapes.polar_circle(GrafLib.Util.Vector2(250, 150), 90, GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 245), GrafLib.Util.Color(150, 150, 150));

    GrafLib.Shapes.polar_circle(GrafLib.Util.Vector2(250, 150), 10, GrafLib.Util.Color(0, 0, 0));
    GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 150), GrafLib.Util.Color(0, 0, 0));
}

function step() {
    GrafLib.refreshScreen();

    draw_stand();

    rotation += 0.01;
    let rotated_fan = GrafLib.Transform.rotate_multiple(fan_coords, rotation, GrafLib.Util.Vector2(250, 150));
    let rotated_color = GrafLib.Transform.rotate_multiple(coloring_coords, rotation, GrafLib.Util.Vector2(250, 150));

    // Top
    GrafLib.Shapes.polygon([
        rotated_fan[0],
        rotated_fan[1],
        rotated_fan[2]
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(rotated_color[0], GrafLib.Util.Color(0, 150, 255));

    // Bottom
    GrafLib.Shapes.polygon([
        rotated_fan[3],
        rotated_fan[4],
        rotated_fan[5]
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(rotated_color[1], GrafLib.Util.Color(255, 255, 0));

    // Left
    GrafLib.Shapes.polygon([
        rotated_fan[6],
        rotated_fan[7],
        rotated_fan[8]
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(rotated_color[2], GrafLib.Util.Color(0, 150, 0));

    // Right
    GrafLib.Shapes.polygon([
        rotated_fan[9],
        rotated_fan[10],
        rotated_fan[11]
    ], GrafLib.Util.Color(0, 0, 0));

    GrafLib.Coloring.floodFill(rotated_color[3], GrafLib.Util.Color(255, 0, 0));

    requestAnimationFrame(step)
    
    GrafLib.putImageData();
}

step();

GrafLib.putImageData();