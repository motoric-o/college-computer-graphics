import { gambar_titik, dda_line } from "./lib/primitive.js";
import { kotak } from "./lib/shape.js";

let canvas_handler = document.querySelector("#mycanvas");
let jarak_text = document.querySelector("#jarak");
let context = canvas_handler.getContext("2d");

let counter = 0;

let saved_coord = [];
let to_clear_coord = [];

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

canvas_handler.addEventListener('click', function (e) {
    if (counter < 2) {
        let x = e.x;
        let y = e.y;

        saved_coord.push({ x: x, y: y });

        kotak(image_data, { x: saved_coord[counter].x - 2, y: saved_coord[counter].y - 2 }, { x: saved_coord[counter].x + 2, y: saved_coord[counter].y + 2 }, { r: 255, g: 0, b: 0 });

        counter += 1;

        if (counter == 2) {
            dda_line(image_data, saved_coord[0], saved_coord[1], { r: 0, g: 0, b: 255 });
            let delta_x = Math.abs(saved_coord[0].x - saved_coord[1].x);
            let delta_y = Math.abs(saved_coord[0].y - saved_coord[1].y);

            let length = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
            console.log(length);
            jarak_text.textContent = ` Jarak: ${length}`;
        }
    } else {
        counter = 0;
        saved_coord = [];

        for (let i = 0; i < canvas_handler.width; i++) {
            for (let j = 0; j < canvas_handler.height; j++) {
                gambar_titik(image_data, i, j, { r: 255, g: 255, b: 255 })
            }
        }

        jarak_text.textContent = ` Jarak:`;
    }

    context.putImageData(image_data, 0, 0);
});


context.putImageData(image_data, 0, 0);