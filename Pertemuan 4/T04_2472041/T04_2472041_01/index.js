import *  as primitive from "../lib/primitive.js";
import * as shapes from "../lib/shapes.js";
import * as coloring from "../lib/coloring.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

shapes.polygon(image_data, [
    {x: 250 ,y: 75},
    {x: 200 ,y: 150},
    {x: 300 ,y: 150}
], {r: 255, g: 0, b: 0});

coloring.floodFillStack(image_data, 250, 100, {r: 255, g: 0, b: 0, a: 255}, {r: 255, g: 0, b: 0, a: 255});

shapes.polygon(image_data, [
    {x: 200 ,y: 150},
    {x: 300 ,y: 150},
    {x: 300 ,y: 350},
    {x: 200 ,y: 350},
], {r: 150, g: 150, b: 150});

shapes.lingkaran_polar(image_data, 250, 250, 25, {r: 0, g: 0, b: 0});

coloring.floodFillStack(image_data, 250, 250, {r: 150, g: 255, b: 255, a: 255}, {r: 150, g: 255, b: 255, a: 255});

coloring.floodFillStack(image_data, 250, 210, {r: 150, g: 150, b: 150, a: 255});

shapes.polygon(image_data, [
    {x: 301 ,y: 350},
    {x: 350 ,y: 375},
    {x: 301 ,y: 250},
], {r: 255, g: 0, b: 0});

coloring.floodFillStack(image_data, 325, 350, {r: 255, g: 0, b: 0, a: 255});

shapes.polygon(image_data, [
    {x: 200 ,y: 350},
    {x: 150 ,y: 375},
    {x: 200 ,y: 250},
], {r: 255, g: 0, b: 0});

coloring.floodFillStack(image_data, 175, 350, {r: 255, g: 0, b: 0, a: 255});

shapes.polygon(image_data, [
    {x: 225 ,y: 350},
    {x: 275 ,y: 350},
    {x: 250 ,y: 425}
], {r: 255, g: 150, b: 0});

coloring.floodFillStack(image_data, 250, 375, {r: 255, g: 150, b: 0, a: 255});

coloring.floodFillStack(image_data, 1, 1, {r: 0, g: 0, b: 50, a: 255});

shapes.lingkaran_polar(image_data, 100, 100, 5, {r: 255, g: 255, b: 0})

coloring.floodFillStack(image_data, 100, 100, {r: 255, g: 255, b: 0, a: 255}, {r: 255, g: 255, b: 0, a: 255});

shapes.lingkaran_polar(image_data, 400, 200, 5, {r: 255, g: 255, b: 0})

coloring.floodFillStack(image_data, 400, 200, {r: 255, g: 255, b: 0, a: 255}, {r: 255, g: 255, b: 0, a: 255});

shapes.lingkaran_polar(image_data, 150, 300, 5, {r: 255, g: 255, b: 0})

coloring.floodFillStack(image_data, 150, 300, {r: 255, g: 255, b: 0, a: 255}, {r: 255, g: 255, b: 0, a: 255});

shapes.lingkaran_polar(image_data, 350, 390, 5, {r: 255, g: 255, b: 0})

coloring.floodFillStack(image_data, 350, 390, {r: 255, g: 255, b: 0, a: 255}, {r: 255, g: 255, b: 0, a: 255});

context.putImageData(image_data, 0, 0);