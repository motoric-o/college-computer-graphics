// 2472041 - Rico Dharmawan

const image = document.querySelector("#canvasInput");

document.querySelector("#fileInput").addEventListener("change", (e) => {
    let image = document.querySelector("#canvasInput");
    let file = e.target.files[0];

    if (file) {
        document.querySelector("#canvasInput").src = URL.createObjectURL(file);
    }
});

document.querySelector("#processButton").addEventListener("click", (e) => {
    let src = cv.imread(image);
    let dst = new cv.Mat();
    src.convertTo(dst, cv.CV_8UC4);
    
    for (let i = 0; i < src.rows * src.cols; i++) {
        let R = src.data[i * 4];
        let G = src.data[i * 4 + 1];
        let B = src.data[i * 4 + 2];

        const tr = Math.min(0.393 * R + 0.796 * G + 0.189 * B, 255);
        const tg = Math.min(0.349 * R + 0.686 * G + 0.168 * B, 255);
        const tb = Math.min(0.272 * R + 0.534 * G + 0.131 * B, 255);

        dst.data[i * 4] = tr;
        dst.data[i * 4 + 1] = tg;
        dst.data[i * 4 + 2] = tb;
    }
    
    cv.imshow('outputCanvas', dst);

    src.delete();
    dst.delete();
});