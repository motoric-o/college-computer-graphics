// Rico Dharmawan - 2472041
import { Color, Vector2 } from "../lib/graphics/primitive/index.js";
import { toRad } from "../lib/util/math.js";
import MatrixClass from "../lib/util/matrix.js";
import GraphicsLib from "../lib/graphics/graphicsLib.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d", { willReadFrequently: true });
const theta = toRad(15);
const k = 1 / (Math.cos(theta) + Math.sin(theta))
const matrix = new MatrixClass();
const graphics = new GraphicsLib(context, canvas_handler);

let square_vertices = [
    Vector2(100, 100),
    Vector2(100, 400),
    Vector2(400, 400),
    Vector2(400, 100)
];

graphics.Shapes.polygon(square_vertices, Color(0, 0, 0));
graphics.Coloring.floodFill(Vector2(250, 250), Color(0, 0, 150));

for (let i = 0; i < 11; i++) {
    const scale = matrix.create_fixedp_scale(250, 250, k, k);
    const rotation = matrix.create_fixedp_rotation(250, 250, toRad(15));

    const transformation = matrix.multiply(rotation, scale);
    square_vertices = graphics.Transform.transform_multiple(square_vertices, transformation)
    graphics.Shapes.polygon(square_vertices, Color(0, 0, 0));

    if (i % 2 == 0) {
        graphics.Coloring.floodFill(Vector2(250, 250), Color(255, 150, 0));
    } else {
        graphics.Coloring.floodFill(Vector2(250, 250), Color(0, 0, 150));
    }
}

graphics.Coloring.floodFill(Vector2(250, 250), Color(255, 0, 0));



graphics.putImageData()
