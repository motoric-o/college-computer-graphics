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

context.putImageData(image_data, 0, 0);