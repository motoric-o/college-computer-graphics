let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

function draw_dot(x, y, color) {
    let index = 4 * (x + (y * canvas_handler.width));
    image_data.data[index] = color.r;
    image_data.data[index + 1] = color.g;
    image_data.data[index + 2] = color.b;
    image_data.data[index + 3] = 255;
}

function dda_line(start, end, color) {
    let delta_x = Math.abs(end.x - start.x);
    let delta_y = Math.abs(end.y - start.y);

    let grad = delta_y / delta_x;

    if (delta_x >= delta_y) {
        if (end.x < start.x) {
            console.log('a')
            let y = start.y;
            for (let x = start.x; x > end.x; x--) {
                y = Math.round(y - grad);
                draw_dot(x, y, color);
            }
        } else {
            console.log('b')
            let y = start.y;
            for (let x = start.x; x < end.x; x++) {
                y = Math.round(y + grad);
                draw_dot(x, y, color);
            }
        }
    } else {
        if (end.y < start.y) {
            console.log('c')
            let y = start.y;
            for (let x = start.x; x > end.x; x--) {
                y = Math.round(y - grad);
                
                draw_dot(x, y, color);
            }
        } else {
            console.log('d')
            let y = start.y;
            for (let x = start.x; x < end.x; x++) {
                y  = Math.round(y + grad);
                console.log(x, y)
                draw_dot(x, y, color);
            }
        }
    }
}

function draw_shape(start, end, color) {
    if (Math.abs(start.y - end.y) > 0) {
        for (let y = start.y; y < end.y; y++) {
            if (Math.abs(start.x - end.x) > 0) {
                for (let x = start.x; x < end.x; x++) {
                    draw_dot(x, y, color);
                }
            } else {
                draw_dot(start.x, y, color);
            }
        }
    } else {
        for (let x = start.x; x < end.x; x++) {
            draw_dot(x, start.y, color);
        }
    }
}

// // horizontal line
// draw_shape({ x: 100, y: 200 }, { x: 200, y: 200 }, { r: 0, g: 0, b: 255 })

// vertical line
// draw_shape({ x: 100, y: 100 }, { x: 100, y: 200 }, { r: 0, g: 255, b: 0 })

// // square
// draw_shape({ x: 300, y: 300 }, { x: 400, y: 400 }, { r: 0, g: 255, b: 0 })
dda_line({ x: 100, y: 100 }, { x: 120, y: 200 }, { r: 0, g: 255, b: 0 })

dda_line({ x: 100, y: 200 }, { x: 200, y: 200 }, { r: 0, g: 0, b: 255 })

// diagonal line
dda_line({ x: 200, y: 200 }, { x: 100, y: 100 }, { r: 255, g: 0, b: 0 })

// diagonal left ro right
// dda_line({ x: 100, y: 100 }, { x: 200, y: 200 }, { r: 255, g: 0, b: 255 })

// diagonal right to left
// dda_line({ x: 200, y: 300 }, { x: 100, y: 100 }, { r: 255, g: 150, b: 0 })

// diagonal left to right with delta x > delta y
// dda_line({ x: 100, y: 100 }, { x: 300, y: 200 }, { r: 0, g: 150, b: 0 })

// diagonal left ro right
// dda_line({ x: 200, y: 100 }, { x: 200, y: 200 }, { r: 0, g: 0, b: 0 });

context.putImageData(image_data, 0, 0);