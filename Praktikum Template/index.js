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

context.putImageData(image_data, 0, 0);