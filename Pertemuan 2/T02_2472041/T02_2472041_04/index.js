// Rico Dharmawan - 2472041

let canvas_handler = document.querySelector("#mycanvas");
let x_input = document.querySelector("#x");
let y_input = document.querySelector("#y");
let context = canvas_handler.getContext("2d");

let counter = 0;

let saved_coord = [];

let image_data = context.getImageData(
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
                }
            } else {
                gambar_titik(start.x, y, color);
            }
        }
    } else {
        for (let x = start.x; x < end.x; x++) {
            gambar_titik(x, start.y, color);
        }
    }
}

function addLocation() {
    let x = parseInt(x_input.value);
    let y = parseInt(y_input.value);

    if (saved_coord.length > 0) {
        saved_coord.find((coord) => {
            if (coord.x === x && coord.y === y) {
                alert("Titik sudah ada!");
                return true;
            }
        });
    }
    saved_coord.push({x: x, y: y});

    // Clear canvas
    resetCanvas();

    // Rerender coordinates
    for (let i = 0; i < saved_coord.length; i++) {
        let x = saved_coord[i].x;
        let y = saved_coord[i].y;
        kotak({x: x - 5, y: y - 5}, {x: x + 5, y: y + 5}, {r: 255, g: 0, b: 0});
    }

    if (saved_coord.length > 1) {
        // Link by nearest neighbor
        let nearest_coords = [];
        let already_linked = [];

        for (let i = 0; i < saved_coord.length; i++) {
            let nearest = {i: -1, j: -1, distance: Number.MAX_VALUE};
            let exists = false;
            for (let j = 0; j < saved_coord.length; j++) {
                let distance = Math.sqrt(Math.pow(saved_coord[i].x - saved_coord[j].x, 2) + Math.pow(saved_coord[i].y - saved_coord[j].y, 2));
                if (distance < nearest.distance && distance > 0 && !already_linked.includes(j)) {
                    nearest = {i: i, j: j, distance: distance};
                }
            }

            if (nearest.i !== -1 && nearest.j !== -1) {
                nearest_coords.push(nearest);
                already_linked.push(i);
            }
        }

        console.log(nearest_coords);

        for (let i = 0; i < nearest_coords.length; i++) {
            let start = saved_coord[nearest_coords[i].i];
            let end = saved_coord[nearest_coords[i].j];
            dda_line(start, end, {r: 0, g: 0, b: 255});
        }
    }

    context.putImageData(image_data, 0, 0);
}

function resetCanvas() {
    for (let i = 0; i < canvas_handler.width; i++) {
        for (let j = 0; j < canvas_handler.height; j++) {
            gambar_titik(i, j, {r: 255, g: 255, b: 255})
        }
    }
    context.putImageData(image_data, 0, 0);
}

function clearCanvas() {
    resetCanvas();
    saved_coord = [];
}

context.putImageData(image_data, 0, 0);