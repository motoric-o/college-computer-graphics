import { gambar_titik, dda_line } from "./lib/primitive.js";
import { ellipse, kotak, naive_circle, polar_circle } from "./lib/shape.js";

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
ellipse(image_data, 250, 250, 100, 50, { r: 255, g: 0, b: 0 });

context.putImageData(image_data, 0, 0);