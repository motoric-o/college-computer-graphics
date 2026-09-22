let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

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
    image_data.data[index + 3] = color.a || 255;
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
                    x = x + 1/grad;
                } else {
                    x = x - 1/grad;
                }
                gambar_titik(x, y, color)
            }
        } else {
            console.log('d')
            let x = start.x
            for (let y = start.y; y < end.y; y++) {
                if (end.x > start.x) {
                    x = x + 1/grad;
                } else {
                    x = x - 1/grad;
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

for (let x = 10; x < canvas_handler.width; x=x+10) {
    dda_line({x: x, y: 0}, {x: x, y: canvas_handler.height}, {r: 0, g: 0, b: 0, a: 25});
}

for (let y = 10; y < canvas_handler.height; y=y+10) {
     dda_line({x: 0, y: y}, {x: canvas_handler.width, y: y}, {r: 0, g: 0, b: 0, a: 25});
}

for (let x = 10; x < canvas_handler.width; x=x+10) {
    if (x % 50 == 0) {
        dda_line({x: x-1, y: 0}, {x: x-1, y: canvas_handler.height}, {r: 0, g: 0, b: 0, a: 75});
        dda_line({x: x, y: 0}, {x: x, y: canvas_handler.height}, {r: 0, g: 0, b: 0, a: 75});
        dda_line({x: x+1, y: 0}, {x: x+1, y: canvas_handler.height}, {r: 0, g: 0, b: 0, a: 75});
    }
}


for (let y = 10; y < canvas_handler.height; y=y+10) {
    if (y % 50 == 0) {
        dda_line({x: 0, y: y-1}, {x: canvas_handler.width, y: y-1}, {r: 0, g: 0, b: 0, a: 75});
        dda_line({x: 0, y: y}, {x: canvas_handler.width, y: y}, {r: 0, g: 0, b: 0, a: 75});
        dda_line({x: 0, y: y+1}, {x: canvas_handler.width, y: y+1}, {r: 0, g: 0, b: 0, a: 75});
    }
}

context.putImageData(image_data, 0, 0);