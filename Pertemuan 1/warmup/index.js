let canvas_handler = document.querySelector("#mycanvas");
let player_handler = document.querySelector("#player");
let ctx = canvas_handler.getContext("2d");
let ctx2 = player_handler.getContext("2d");

const input = document.querySelector("#key");
let x = 0
let y = 0

ctx2.fillStyle = "black";
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
            ctx.fillRect(j * 62.5, i * 62.5, 62.5, 62.5);
        } else if (i % 2 !== 0 && j % 2 !== 0) {
            ctx.fillRect(j * 62.5, i * 62.5, 62.5, 62.5);
        }
    }
}


ctx2.fillStyle = "red";
ctx2.fillRect(0, 0, 62.5, 62.5);

input.addEventListener("keydown", function (event) {
    let value = input.value;

    ctx2.clearRect(x, y, 62.5, 62.5);

    if (event.key === "w") {
        y += 62.5;
    } else if (event.key === "s") {
        y -= 62.5;
    } else if (event.key === "a") {
        x -= 62.5;
    } else if (event.key === "d") {
        x += 62.5;
    }

    ctx2.fillStyle = "red";
    ctx2.fillRect(x, y, 62.5, 62.5);
});
