// 2472041 - Rico Dharmawan

import { graphicsLib } from "../lib/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let pompa = document.querySelector("#pompa");
let restart = document.querySelector("#restart");
let status = document.querySelector("#game");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });

const GrafLib = new graphicsLib(context, canvas_handler);
let radius = 25;
let loop = null;
let animId;

GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(250, 250), radius, GrafLib.Util.Color(0, 0, 0));
GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 250), GrafLib.Util.Color(255, 0, 0));

function resize() {
    GrafLib.refreshScreen();
    GrafLib.Shapes.polar_circle(GrafLib.Util.Coordinate(250, 250), radius, GrafLib.Util.Color(0, 0, 0));
    GrafLib.Coloring.floodFill(GrafLib.Util.Coordinate(250, 250), GrafLib.Util.Color(255, 0, 0));
    GrafLib.putImageData();
    animId = requestAnimationFrame(resize);
}

resize();

pompa.addEventListener('mousedown', function() {
    loop = setInterval(function() {
        if (radius > 200) {
            clearInterval(loop);
            loop = null;
            cancelAnimationFrame(animId);
            animId = null;
            GrafLib.refreshScreen();
            status.innerHTML = 'Balon Meledak!'
        } else {
            radius += 1;
        }
    }, 0.1);
});

pompa.addEventListener('mouseup', function() {
    clearInterval(loop);
    loop = null;
});

restart.addEventListener('click', function() {
    radius = 25;
    resize();
    status.innerHTML = 'Balon siap dipompa';
});