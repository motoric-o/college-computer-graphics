// Rico Dharmawan - 2472041

import *  as lib from '../../../lib/index.js';

let canvas_handler = document.querySelector("#mycanvas");
let ganti_lampu = document.querySelector("#ganti");
let berhenti = document.querySelector("#berhenti")
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

let pixel = new lib.Pixel(image_data);
let line = new lib.Line(image_data);
let Color = lib.Color;
let Coordinate = lib.Coordinate;
let coloring = new lib.Coloring(image_data);
let shapes = new lib.Shapes(image_data);

let current = -1;
let light_coords = [
    Coordinate(250, 100),
    Coordinate(250, 200),
    Coordinate(250, 300)
];
let colors = [
    Color(255, 0, 0),
    Color(255, 255, 0),
    Color(0, 255, 0)
];

shapes.polygon(
    [
        Coordinate(200, 50),
        Coordinate(300, 50),
        Coordinate(300, 350),
        Coordinate(200, 350)
    ],
    Color(125, 125, 125));

line.draw(Coordinate(250, 350), Coordinate(250, 500), Color(125, 125, 125));

shapes.polar_circle(light_coords[0], 40, Color(0, 0, 0));
coloring.floodFill(light_coords[0], Color(125, 125, 125));

shapes.polar_circle(light_coords[1], 40, Color(0, 0, 0));
coloring.floodFill(light_coords[1], Color(125, 125, 125));

shapes.polar_circle(light_coords[2], 40, Color(0, 0, 0));
coloring.floodFill(light_coords[2], Color(125, 125, 125));

ganti_lampu.addEventListener('click', function () { 
    if (current >= 0) {
        coloring.floodFill(light_coords[current], Color(125, 125, 125));
    }

    if (current == 2) {
        current = 0;
    } else {
        current += 1;
    }

    coloring.floodFill(light_coords[current], colors[current]);
    context.putImageData(image_data, 0, 0);
});

berhenti.addEventListener('click', function () {
    coloring.floodFill(light_coords[0], colors[0]);
    coloring.floodFill(light_coords[1], Color(125, 125, 125));
    coloring.floodFill(light_coords[2], Color(125, 125, 125));

    current = 0;

    context.putImageData(image_data, 0, 0);
});

context.putImageData(image_data, 0, 0);