import *  as primitive from "./lib/primitive.js";
import * as shapes from "./lib/shapes.js";
import * as coloring from "./lib/coloring.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

// kotak(image_data, { x: 100, y: 100 }, { x: 200, y: 200 }, { r: 255, g: 0, b: 0 });

// naive_circle(image_data, 250, 250, 100, { r: 255, g: 0, b: 0 });
// polar_circle(image_data, 250, 250, 100, { r: 255, g: 0, b: 0 });
// shapes.circle(image_data, 250, 250, 50, { r: 255, g: 0, b: 0 });

let array_titik = [
    {x: 100, y: 100},
    {x: 200, y: 200},
    {x: 100, y: 200}
];

shapes.polygon(image_data, array_titik, {r: 255, g: 0, b: 0, a: 255});
coloring.boundary_fill_nonrec(image_data, 120, 150, {r: 255, g: 0, b: 0, a: 255}, {r: 255, g: 0, b: 0, a: 255});
// console.log(primitive.get_dot_color(image_data, primitive.get_dot(100, 101)).b == 255)
// console.log(primitive.compare_dot_color(image_data, primitive.get_dot(100, 100), {r: 255, g: 0, b: 0}))
// primitive.dda_line(image_data, {x: 100, y: 100}, {x: 200, y: 200}, {r: 255, g: 0, b: 0})

context.putImageData(image_data, 0, 0);