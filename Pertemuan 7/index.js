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
    console.log('width: ' + src.cols + '\n' +
        'height: ' + src.rows + '\n' +
        'size: ' + src.size().width + '*' + src.size().height + '\n' +
        'depth: ' + src.depth() + '\n' +
        'channels: ' + src.channels() + '\n' +
        'type: ' + src.type() + '\n'
    );
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)


    // let srcTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0, 0, 0, 1, 1, 0]);
    // let dstTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0.6, 0.2, 0.1, 1.3, 1.5, 0.3]);
    // let dsize = new cv.Size(src.rows, src.cols);
    // let M = cv.getAffineTransform(srcTri, dstTri);

    // cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

    // cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);

    // let M = cv.Mat.ones(25, 25, cv.CV_8U);
    // cv.morphologyEx(src, dst, cv.MORPH_CLOSE, M);

    let M = cv.Mat.ones(10, 10, cv.CV_8U);
    let anchor = new cv.Point(-1, -1);
    // You can try more different parameters
    cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

    // let srcTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0, 0, 0, 1, 1, 0]);
    // let dstTri = cv.matFromArray(3, 1, cv.CV_32FC2, [0.6, 0.2, 0.1, 1.3, 1.5, 0.3]);
    // let dsize = new cv.Size(src.rows, src.cols);
    // M = cv.getAffineTransform(srcTri, dstTri);

    // cv.warpAffine(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

    cv.imshow('outputCanvas', dst);

    src.delete();
    dst.delete();
});