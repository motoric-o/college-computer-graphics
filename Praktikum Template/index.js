// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);
