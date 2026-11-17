import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

const control = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 3, 5);
control.update();

const planeGeo = new THREE.PlaneGeometry(10, 10, 1, 1);
const planeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.position.set(0, -1, 0);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(255, 0, 0)") });
const cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.set(0, 0, -2);
scene.add(cube);

const sphereGeo = new THREE.SphereGeometry(1, 32, 16);
const sphereMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(0, 255, 0)") });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.position.set(-2, 0, 0);
scene.add(sphere);

const vertices = new Float32Array([
  // Cap around (-a, b, 0)
  -0.525731,  0.850651,  0.000000,  -0.850651,  0.000000,  0.525731,   0.000000,  0.525731,  0.850651,
  -0.525731,  0.850651,  0.000000,   0.000000,  0.525731,  0.850651,   0.525731,  0.850651,  0.000000,
  -0.525731,  0.850651,  0.000000,   0.525731,  0.850651,  0.000000,   0.000000,  0.525731, -0.850651,
  -0.525731,  0.850651,  0.000000,   0.000000,  0.525731, -0.850651,  -0.850651,  0.000000, -0.525731,
  -0.525731,  0.850651,  0.000000,  -0.850651,  0.000000, -0.525731,  -0.850651,  0.000000,  0.525731,

  // Upper equatorial band
   0.525731,  0.850651,  0.000000,   0.000000,  0.525731,  0.850651,   0.850651,  0.000000,  0.525731,
   0.000000,  0.525731,  0.850651,  -0.850651,  0.000000,  0.525731,   0.000000, -0.525731,  0.850651,
  -0.850651,  0.000000,  0.525731,  -0.850651,  0.000000, -0.525731,  -0.525731, -0.850651,  0.000000,
  -0.850651,  0.000000, -0.525731,   0.000000,  0.525731, -0.850651,   0.000000, -0.525731, -0.850651,
   0.000000,  0.525731, -0.850651,   0.525731,  0.850651,  0.000000,   0.850651,  0.000000, -0.525731,

  // Opposite cap around (a, -b, 0)
   0.525731, -0.850651,  0.000000,   0.850651,  0.000000,  0.525731,   0.000000, -0.525731,  0.850651,
   0.525731, -0.850651,  0.000000,   0.000000, -0.525731,  0.850651,  -0.525731, -0.850651,  0.000000,
   0.525731, -0.850651,  0.000000,  -0.525731, -0.850651,  0.000000,   0.000000, -0.525731, -0.850651,
   0.525731, -0.850651,  0.000000,   0.000000, -0.525731, -0.850651,   0.850651,  0.000000, -0.525731,
   0.525731, -0.850651,  0.000000,   0.850651,  0.000000, -0.525731,   0.850651,  0.000000,  0.525731,

  // Lower equatorial band
   0.000000, -0.525731,  0.850651,   0.850651,  0.000000,  0.525731,   0.000000,  0.525731,  0.850651,
  -0.525731, -0.850651,  0.000000,   0.000000, -0.525731,  0.850651,  -0.850651,  0.000000,  0.525731,
   0.000000, -0.525731, -0.850651,  -0.525731, -0.850651,  0.000000,  -0.850651,  0.000000, -0.525731,
   0.850651,  0.000000, -0.525731,   0.000000, -0.525731, -0.850651,   0.000000,  0.525731, -0.850651,
   0.850651,  0.000000,  0.525731,   0.850651,  0.000000, -0.525731,   0.525731,  0.850651,  0.000000,
]);

// Build the Three.js mesh
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  roughness: 0.35,
  metalness: 0.1,
  flatShading: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(2, 0, 0);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    control.update()
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();