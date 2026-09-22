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

function gambar_titik(x, y, color) {
    x = Math.round(x);
    y = Math.round(y);
    let index = 4 * (x + (y * canvas_handler.width));
    image_data.data[index] = color.r;
    image_data.data[index + 1] = color.g;
    image_data.data[index + 2] = color.b;
    image_data.data[index + 3] = 255;
}

function dda_line(start, end, color) {
    let delta_x = Math.abs(end.x - start.x);
    let delta_y = Math.abs(end.y - start.y);

    let grad = Math.abs(delta_y) / delta_x;

    if (delta_x >= delta_y) {
        if (end.x < start.x) {
            console.log('a')
            let y = start.y;
            for (let x = start.x; x > end.x; x--) {
                if (end.y > start.y) {
                    y = y + grad;
                } else {
                    y = y - grad;
                }
                gambar_titik(x, y, color);
                to_clear_coord.push({x: x, y: y});
            }
        } else {
            console.log('b')
            let y = start.y;
            for (let x = start.x; x < end.x; x++) {
                if (end.y > start.y) {
                    y = y + grad;
                } else {
                    y = y - grad;
                }
                gambar_titik(x, y, color);
                to_clear_coord.push({x: x, y: y});
            }
        }
    } else {
        if (end.y < start.y) {
            console.log('c')
            let x = start.x
            for (let y = start.y; y > end.y; y--) {
                if (end.x > start.x) {
                    x = x + 1 / grad;
                } else {
                    x = x - 1 / grad;
                }
                gambar_titik(x, y, color)
                to_clear_coord.push({x: x, y: y});
            }
        } else {
            console.log('d')
            let x = start.x
            for (let y = start.y; y < end.y; y++) {
                if (end.x > start.x) {
                    x = x + 1 / grad;
                } else {
                    x = x - 1 / grad;
                }
                gambar_titik(x, y, color)
                to_clear_coord.push({x: x, y: y});
            }
        }
    }
}

function kotak(start, end, color) {
    if (Math.abs(start.y - end.y) > 0) {
        for (let y = start.y; y < end.y; y++) {
            if (Math.abs(start.x - end.x) > 0) {
                for (let x = start.x; x < end.x; x++) {
                    gambar_titik(x, y, color);
                    to_clear_coord.push({x: x, y: y});
                }
            } else {
                gambar_titik(start.x, y, color);
                to_clear_coord.push({x: start.x, y: y});
            }
        }
    } else {
        for (let x = start.x; x < end.x; x++) {
            gambar_titik(x, start.y, color);
            to_clear_coord.push({x: x, y: start.y});
        }
    }
}

canvas_handler.addEventListener('click', function (e) {
    if (counter < 2) {
        x = e.x;
        y = e.y;

        saved_coord.push({x: x, y: y});

        kotak({x: saved_coord[counter].x - 2, y: saved_coord[counter].y - 2}, {x: saved_coord[counter].x + 2, y: saved_coord[counter].y + 2}, {r: 255, g: 0, b: 0});

        counter += 1;

        if (counter == 2) {
            dda_line(saved_coord[0], saved_coord[1], {r: 0, g: 0, b: 255});
            let delta_x = Math.abs(saved_coord[0].x - saved_coord[1].x);
            let delta_y = Math.abs(saved_coord[0].y - saved_coord[1].y);

            let length = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
            console.log(length);
            jarak_text.textContent = ` Jarak: ${length}`;
        }
    } else {
        counter = 0;
        saved_coord = [];
        
        for (let i = 0; i < to_clear_coord.length; i++) {
            x = to_clear_coord[i].x
            y = to_clear_coord[i].y
            gambar_titik(x, y, {r: 255, g: 255, b: 255})
        }
        jarak_text.textContent = ` Jarak:`;
    }

    context.putImageData(image_data, 0, 0);
});

context.putImageData(image_data, 0, 0);