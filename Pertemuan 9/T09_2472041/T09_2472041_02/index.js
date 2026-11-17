// Rico Dharmawan - 2472041

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// USER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 3, 5);
control.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);

const vertices = new Float32Array([
    // Upper
    // Front
    -0.125, 0.75, 0.25, 0.125, 0.75, 0.25, 0.0, 1.25, 0.0,

    // Front Right
    0.125, 0.75, 0.25, 0.25, 0.75, 0, 0.0, 1.25, 0.0,

    // Front Left
    -0.25, 0.75, 0, -0.125, 0.75, 0.25, 0.0, 1.25, 0.0,

    // Back Right
    -0.125, 0.75, -0.25, -0.25, 0.75, 0, 0.0, 1.25, 0.0,

    // Back Left
    0.25, 0.75, 0, 0.125, 0.75, -0.25, 0.0, 1.25, 0.0,

    // Upper Back
    0.125, 0.75, -0.25, -0.125, 0.75, -0.25, 0.0, 1.25, 0.0,

    // Upper Mid
    // Front
    -0.25, 0, 0.45, 0.25, 0, 0.45, -0.125, 0.75, 0.25, -0.125, 0.75, 0.25, 0.25, 0, 0.45, 0.125, 0.75, 0.25,

    // Front Right
    0.25, 0, 0.45, 0.5, 0, 0, 0.125, 0.75, 0.25, 0.125, 0.75, 0.25, 0.5, 0, 0, 0.25, 0.75, 0,

    // Front Left
    -0.5, 0, 0, -0.125, 0.75, 0.25, -0.25, 0.75, 0, -0.125, 0.75, 0.25, -0.5, 0, 0, -0.25, 0, 0.45,

    // Back Right
    0.5, 0, 0, 0.25, 0, -0.45, 0.125, 0.75, -0.25, 0.125, 0.75, -0.25, 0.25, 0.75, 0, 0.5, 0, 0,

    // Back Left
    -0.125, 0.75, -0.25, -0.5, 0, 0, -0.25, 0.75, 0, -0.125, 0.75, -0.25, -0.25, 0, -0.45, -0.5, 0, 0,

    // Back
    0.25, 0, -0.45, -0.25, 0, -0.45, 0.125, 0.75, -0.25, 0.125, 0.75, -0.25, -0.25, 0, -0.45, -0.125, 0.75, -0.25,
]);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// AIGEN - I'm making a crystal mesh and I want to color it like this, how do I achieve this?
const count = geometry.attributes.position.count;
const colors = new Float32Array(count * 3);
const pos = geometry.attributes.position;
const color = new THREE.Color();
for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const t = Math.abs(y);
    if (t > 0.6) {
        color.setRGB(1.0, 0.25, 1.0);
    } else {
        color.setRGB(0.2, 0.8, 1.0);
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
}

geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.2,
    metalness: 0.1,
});

const wireframeGeo = new THREE.WireframeGeometry(geometry);
const wireframeMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
});
const wireframe1 = new THREE.LineSegments(wireframeGeo, wireframeMat);
const wireframe2 = new THREE.LineSegments(wireframeGeo, wireframeMat);
wireframe2.rotation.z = Math.PI;

// USER
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(geometry, material);
mesh2.rotation.z = Math.PI;

const crystal = new THREE.Group();
crystal.add(mesh);
crystal.add(mesh2);
crystal.add(wireframe1);
crystal.add(wireframe2);

scene.add(crystal);


function animate() {
    requestAnimationFrame(animate);
    control.update()
    renderer.render(scene, camera);
}

animate();