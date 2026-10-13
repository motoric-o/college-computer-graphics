// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphics/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let pompa = document.querySelector("#pompa");
let restart = document.querySelector("#restart");
let status = document.querySelector("#game");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);
let radius = 25;
let loop = null;
let animId;

GrafLib.Shapes.polar_circle(GrafLib.Util.Vector2(250, 250), radius, GrafLib.Util.Color(0, 0, 0));
GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 250), GrafLib.Util.Color(255, 0, 0));

function resize() {
    GrafLib.refreshScreen();
    GrafLib.Shapes.polar_circle(GrafLib.Util.Vector2(250, 250), radius, GrafLib.Util.Color(0, 0, 0));
    GrafLib.Coloring.floodFill(GrafLib.Util.Vector2(250, 250), GrafLib.Util.Color(255, 0, 0));
    if (loop && radius < 200) {
        radius += 0.5;
    } else if (radius >= 200) {
        cancelAnimationFrame(animId);
        animId = null;
        GrafLib.refreshScreen();
        status.innerHTML = 'Balon Meledak!'
    }
    GrafLib.putImageData();
    animId = requestAnimationFrame(resize);
}

resize();

pompa.addEventListener('mousedown', function() {
    loop = true;
});

pompa.addEventListener('mouseup', function() {
    loop = false;
});

restart.addEventListener('click', function() {
    radius = 25;
    resize();
    status.innerHTML = 'Balon siap dipompa';
});