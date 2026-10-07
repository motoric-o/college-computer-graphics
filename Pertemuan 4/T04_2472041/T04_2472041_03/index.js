// Rico Dharmawan - 2472041

import *  as lib from '../lib/index.js';

let canvas_handler = document.querySelector("#mycanvas");
let throw_span = document.querySelector("#throw");
let score_span = document.querySelector("#score");
let clear_button = document.querySelector("#clear");
let total_span = document.querySelector("#total");
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

let count = 0;
let real_score = 0;

let points = {
    red: [Color(255, 0, 0), 20],
    yellow: [Color(255, 255, 0), 10],
    blue: [Color(0, 0, 255), 5],
    green: [Color(0, 255, 0), 2]
}

function redraw() {
    pixel.clearCanvas();

    shapes.polar_circle(Coordinate(250, 250), 25, Color(255, 0, 0));
    coloring.floodFill(Coordinate(250, 250), Color(255, 0, 0, 255));

    shapes.polar_circle(Coordinate(250, 250), 50, Color(255, 255, 0));
    coloring.floodFill(Coordinate(250, 280), Color(255, 255, 0));

    shapes.polar_circle(Coordinate(250, 250), 75, Color(0, 0, 255));
    coloring.floodFill(Coordinate(250, 310), Color(0, 0, 255));

    shapes.polar_circle(Coordinate(250, 250), 100, Color(0, 255, 0));
    coloring.floodFill(Coordinate(250, 330), Color(0, 255, 0));

    context.putImageData(image_data, 0, 0);
}

canvas_handler.addEventListener("click", (event) => {
    if (count >= 5) {
        return;
    }

    let x = event.offsetX;
    let y = event.offsetY;
    let color = pixel.get_pixel_color(x, y);

    shapes.polygon([
        Coordinate(x-2, y-2),
        Coordinate(x+2, y-2),
        Coordinate(x+2, y+2),
        Coordinate(x-2, y+2)
    ], Color(0, 0, 0));

    coloring.boundaryFill(Coordinate(x, y), Color(0, 0, 0), Color(0, 0, 0));

    count += 1;

    let plus = 0;

    if (pixel.compareColor(color, points.red[0])) {
        plus = points.red[1];
    } else if (pixel.compareColor(color, points.yellow[0])) {
        plus = points.yellow[1];
    } else if (pixel.compareColor(color, points.blue[0])) {
        plus = points.blue[1];
    } else if (pixel.compareColor(color, points.green[0])) {
        plus = points.green[1];
    }

    throw_span.innerHTML = `${count}/5`;
    score_span.innerHTML = `+${plus}`;
    real_score += plus;
    total_span.innerHTML = ` | Total Skor: ${real_score}`;

    if (count == 5) {
        score_span.innerHTML = score_span.innerHTML + ` | Permainan sudah selesai!`;
    }

    context.putImageData(image_data, 0, 0);
});

clear_button.addEventListener("click", (event) => {
    count = 0;
    throw_span.innerHTML = `0/5`;
    score_span.innerHTML = `0`;
    real_score = 0;
    total_span.innerHTML = ``;
    redraw();
});

redraw();

context.putImageData(image_data, 0, 0);