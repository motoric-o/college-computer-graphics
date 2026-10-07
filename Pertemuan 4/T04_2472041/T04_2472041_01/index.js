// Rico Dharmawan - 2472041

import *  as lib from '../lib/index.js';

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

let pixel = new lib.Pixel(image_data);
let Color = lib.Color;
let Coordinate = lib.Coordinate;
let coloring = new lib.Coloring(image_data);
let shapes = new lib.Shapes(image_data);

shapes.polygon([
    Coordinate(250, 75),
    Coordinate(201, 150),
    Coordinate(300, 150)
], Color(255, 0, 0));

coloring.floodFill(Coordinate(250, 100), Color(255, 0, 0));

shapes.polygon([
    Coordinate(200, 150),
    Coordinate(300, 150),
    Coordinate(300, 350),
    Coordinate(200, 350),
], Color(150, 150, 150));

coloring.floodFill(Coordinate(250, 210), Color(150, 150, 150));

shapes.polar_circle(Coordinate(250, 250), 25, Color(0, 0, 0));

coloring.floodFill(Coordinate(250, 250), Color(150, 255, 255));

shapes.polygon([
    Coordinate(301, 350),
    Coordinate(350, 375),
    Coordinate(301, 250),
], Color(255, 0, 0));

coloring.floodFill(Coordinate(325, 350), Color(255, 0, 0));

shapes.polygon([
    Coordinate(199, 350),
    Coordinate(150, 375),
    Coordinate(199, 250),
], Color(255, 0, 0));

coloring.floodFill(Coordinate(175, 350), Color(255, 0, 0));

shapes.polygon([
    Coordinate(225, 350),
    Coordinate(275, 350),
    Coordinate(250, 425)
], Color(255, 150, 0));

coloring.floodFill(Coordinate(250, 375), Color(255, 150, 0));

coloring.floodFill(Coordinate(1, 1), Color(0, 0, 50));

shapes.polar_circle(Coordinate(100, 100), 5, Color(255, 255, 0));
coloring.floodFill(Coordinate(100, 100), Color(255, 255, 0));

shapes.polar_circle(Coordinate(400, 200), 5, Color(255, 255, 0));
coloring.floodFill(Coordinate(400, 200), Color(255, 255, 0));

shapes.polar_circle(Coordinate(50, 320), 5, Color(255, 255, 0));
coloring.floodFill(Coordinate(50, 320), Color(255, 255, 0));

shapes.polar_circle(Coordinate(350, 390), 5, Color(255, 255, 0));
coloring.floodFill(Coordinate(350, 390), Color(255, 255, 0));

context.putImageData(image_data, 0, 0);