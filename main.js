import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), // all models and objects added to the background
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Custom objects

const loader = new GLTFLoader();

let spaceStation;
loader.load(
  'models/space_station/scene.gltf',
  function(gltf){
    spaceStation = gltf.scene;
    scene.add(spaceStation);
    spaceStation.scale.set(1,1,1);
    spaceStation.position.z = -35;
    spaceStation.position.y = 6;
    spaceStation.position.x = 8;
    spaceStation.rotation.x = 0.5;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);
let computer;
loader.load(
  'models/computer/scene.gltf',
  function(gltf){
    computer= gltf.scene;
    scene.add(computer);
    computer.scale.set(0.5,0.5,0.5);
    computer.position.z = 10;
    computer.position.x = -1.2;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);
let saturn;
loader.load(
  'models/saturn/scene.gltf',
  function(gltf){
    saturn= gltf.scene;
    scene.add(saturn);
    saturn.scale.set(0.5,0.5,0.5);
    saturn.position.z = -20;
    saturn.position.x = 20;
    saturn.position.y = -10;
    saturn.rotation.z = -10;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);
let spaceShip;
loader.load(
  'models/spaceship/scene.gltf',
  function(gltf){
    spaceShip = gltf.scene;
    scene.add(spaceShip);
    spaceShip.scale.set(0.5,0.5,0.5);
    spaceShip.position.z = 60;
    spaceShip.position.x = -35;
    spaceShip.position.y = -3;
    spaceShip.rotation.y = -10;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);
let earth;
loader.load(
  'models/earth/scene.gltf',
  function(gltf){
    earth = gltf.scene;
    scene.add(earth);
    earth.scale.set(6,6,6);
    earth.position.z = 50;
    earth.position.x = -22;
    earth.position.y = 10;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
)
let goose;
loader.load(
  `models/entitled_goose/scene.gltf`,
  function(gltf){
    goose = gltf.scene;
    scene.add(goose);
    goose.scale.set(0.5,0.5,0.5);
    goose.position.z = -1.5;
    goose.position.x = -0.8;
    goose.position.y = 0.2;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);

// Lighting 

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

// Helper objects

//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

//const axisHelper = new THREE.AxesHelper(100);
//scene.add(axisHelper);

// Add star

function addStar(){
  const geometry = new THREE.SphereGeometry(0.15, 24 ,24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(500)); // randomly generate number between -100 and 100

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar) // Create an array of 1000 values, and for each value, call addStar()

// Add Moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpeg');
const moonNormal = new THREE.TextureLoader().load('images/moonNormal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal
  })
);

scene.add(moon);
moon.position.z = 2;
moon.position.x = -5;
moon.position.y = -2;

// Add Jupiter

const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpeg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(8,1000,1000),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
);

scene.add(jupiter);

jupiter.position.z = 16;
jupiter.position.x = 5;
jupiter.position.y = 2;

// Space background

const spaceTexture = new THREE.TextureLoader().load('images/universe.jpg');
scene.background = spaceTexture;

// Scroll function

function moveCamera(){
  const t = document.body.getBoundingClientRect().top; // JS DOM to get the scroll position of the webpage

  if (computer) {
    computer.rotation.z += 0.0075;
  }

  jupiter.rotation.x += 0.005;
  jupiter.rotation.y += 0.0075;
  jupiter.rotation.z += 0.005;

  if (saturn) {
    saturn.rotation.x += 0.0005;
    saturn.rotation.y += 0.00075;
    saturn.rotation.z += 0.0050;
  }

  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  camera.position.z = t * -0.01;

  //console.log("Camera Position:", camera.position.x, camera.position.y, camera.position.z);

  if (spaceStation) {
    spaceStation.rotation.x += 0.005;
  }
  if (goose){
    goose.rotation.x += 0.0075;
    goose.rotation.y += -0.005;
    goose.rotation.z += 0.005;  
  }
  if (earth){
    earth.rotation.y -=0.005;
  }
}

document.body.onscroll = moveCamera;
moveCamera();

// Animate the scene

function animate(){
  requestAnimationFrame(animate); // Whenever webpage updates in frames, object gets rendered

  if (spaceStation){
    spaceStation.rotation.y += -0.002;
  }
  if (computer){
    computer.rotation.z += 0.0005;
  }
  if (saturn) {
    saturn.rotation.y += 0.005;
    saturn.rotation.x += -0.001;
  }
  if (spaceShip){
    let initialYPosition = spaceShip.position.y;
    const hoverAmplitude = 0.002;
    const hoverFrequency = 0.005;
    const hoverOffSet = Math.sin(Date.now() * hoverFrequency) * hoverAmplitude;
    spaceShip.position.y = initialYPosition + hoverOffSet;
  }
  if (earth){
    earth.rotation.y += -0.002;
  }

  moon.rotation.y += 0.005;
  jupiter.rotation.y += 0.005;

  //controls.update();

  renderer.render(scene, camera);
} 
animate();


