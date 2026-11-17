// Rico Dharmawan - 2472041
import * as THREE from "three";

// USER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 1);

const coneGeo = new THREE.ConeGeometry(2.1, 6, 10, 1, true);
const coneMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(255, 210, 130)"),
});
const cone = new THREE.Mesh(coneGeo, coneMat)
cone.rotation.z = Math.PI;
cone.position.set(0, -3, 0);

const ic1Geo = new THREE.SphereGeometry(2.2, 20, 20);
const ic1Mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(255, 170, 230)")
});
const ic1 = new THREE.Mesh(ic1Geo, ic1Mat);
const ic2Geo = new THREE.SphereGeometry(1.75, 20, 20);
const ic2Mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(255, 255, 255)")
});
const ic2 = new THREE.Mesh(ic2Geo, ic2Mat);
ic2.position.set(0, 2.25, 0);

const cherryGeo = new THREE.SphereGeometry(0.5, 20, 20);
const cherryMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("rgb(255, 0, 0)")
});
const cherry = new THREE.Mesh(cherryGeo, cherryMat);
cherry.position.set(0, 4.25, 0);

const iceCream = new THREE.Group();
iceCream.add(cone);
iceCream.add(ic1);
iceCream.add(ic2);
iceCream.add(cherry);
iceCream.position.set(0, 0, -10)

scene.add(iceCream)

function animate() {
    requestAnimationFrame(animate);
    iceCream.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();