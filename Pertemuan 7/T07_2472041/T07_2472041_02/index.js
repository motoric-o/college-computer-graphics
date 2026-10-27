// 2472041 - Rico Dharmawan

const image = document.querySelector("#canvasInput");

async function createFileFromUrl(path, url) {
    let response = await fetch(url);
    let data = new Uint8Array(await response.arrayBuffer());
    cv.FS_createDataFile('/', path, data, true, false, false);
}

document.querySelector("#fileInput").addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        image.src = URL.createObjectURL(e.target.files[0]);
    }
});

document.querySelector("#processButton").addEventListener("click", async (e) => {
    try {
        await createFileFromUrl('haarcascade_frontalface_default.xml', './haarcascade_frontalface_default.xml');
        await createFileFromUrl('haarcascade_eye.xml', './haarcascade_eye.xml');
    } catch (e) {
        console.error("Failed to laod cascade XML files:", e);
        return;
    }

    let src = cv.imread('canvasInput');
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    let faces = new cv.RectVector();
    let eyes = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();
    let eyeCascade = new cv.CascadeClassifier();
    
    faceCascade.load('haarcascade_frontalface_default.xml');
    eyeCascade.load('haarcascade_eye.xml');
    
    let msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
    for (let i = 0; i < faces.size(); ++i) {
        let roiGray = gray.roi(faces.get(i));
        let roiSrc = src.roi(faces.get(i));
        let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height);
        cv.rectangle(src, point1, point2, [0, 0, 255, 255], 2);
        
        eyeCascade.detectMultiScale(roiGray, eyes);
        for (let j = 0; j < eyes.size(); ++j) {
            let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
            let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
                eyes.get(j).y + eyes.get(j).height);
            cv.rectangle(roiSrc, point1, point2, [0, 255, 0, 255], 2);
        }
        roiGray.delete(); roiSrc.delete();

        if (eyes.size() > 1) {
            cv.putText(src, 'Mata Terbuka', point1, cv.FONT_HERSHEY_SIMPLEX, 0.8, [0, 255, 0, 255], 2);
        } else {
            cv.putText(src, 'Mata Tertutup', point1, cv.FONT_HERSHEY_SIMPLEX, 0.8, [255, 0, 0, 255], 2);
        }
    }
    


    cv.imshow('outputCanvas', src);

    src.delete();
    gray.delete();
    faceCascade.delete();
    eyeCascade.delete();
    faces.delete();
    eyes.delete();
});