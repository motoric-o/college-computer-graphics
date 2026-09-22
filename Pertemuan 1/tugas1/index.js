let canvas_handler = document.querySelector("#mycanvas");
let ctx = canvas_handler.getContext("2d");

ctx.beginPath();
ctx.arc(500, 55, 300, 1.01, 1.375 * Math.PI);
ctx.fillStyle = "#abcf47";
ctx.strokeStyle = "#abcf47";
ctx.stroke();
ctx.fill();
ctx.closePath();

ctx.setTransform(1, -0.1, 0.25, 1, -40, 0);

// Roudned Rect Upper
ctx.roundRect(50, 200, 10, 10, 1);
ctx.fillStyle = "#abcf47";
ctx.strokeStyle = "#abcf47";
ctx.stroke();
ctx.fill();
ctx.closePath();

// Roudned Rect Lower
ctx.roundRect(123, 275, 10, 10, 1);
ctx.fillStyle = "#abcf47";
ctx.strokeStyle = "#abcf47";
ctx.stroke();
ctx.fill();
ctx.closePath();

// Big Rounded Rect Lower
ctx.roundRect(20, 225, 75, 75, [10, 0, 10, 0]);
ctx.lineWidth = 12;
ctx.fillStyle = "#abcf47";
ctx.strokeStyle = "#abcf47";
ctx.stroke();
ctx.closePath();

// Big Rounded Rect Upper
ctx.roundRect(95, 195, 65, 65, [10, 0, 10, 0]);
ctx.lineWidth = 12;
ctx.fillStyle = "#abcf47";
ctx.strokeStyle = "#abcf47";
ctx.stroke();
ctx.closePath();

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.restore();

ctx.fillStyle = "#000000";
ctx.font = "20px Arial";
ctx.fillText("The Faculty Of", 200, 187);
ctx.font = "bold 50px Arial";
ctx.fillText("Information", 200, 230);
ctx.fillText("Technology", 200, 280);
ctx.fillStyle = "#768f31";
ctx.font = "22px Arial";
ctx.fillText("No Limits, No Boundaries", 200, 310);