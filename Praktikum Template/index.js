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


context.putImageData(image_data, 0, 0);