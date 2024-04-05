import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#roboMovement'), 
  alpha: true // Set to transparent so can see the other background
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setY(0);
camera.position.setX(0);

renderer.render(scene, camera);

// Add in Kawabot

const loader = new GLTFLoader();

let kawabot;
loader.load(
  'models/kawabot/scene.gltf',
  function(gltf){
    kawabot = gltf.scene;
    scene.add(kawabot);
    kawabot.scale.set(0.09, 0.09, 0.09); 
    kawabot.position.x = 0.3;  
    kawabot.position.z = -0.48;

    kawabot.rotation.y = Math.PI * 1.8;
  },
  function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error(error);
  }
);

// Add in lighting

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight);

// Kawabot Movement

let movement = false;
let docked = true;

document.addEventListener('mousemove', onMouseMove);
const cursorPosition = { x:0, y:0 };

function onMouseMove(event) {
  if (docked == false) {
    movement = true;
    cursorPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursorPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}

document.addEventListener('dblclick', dock);

function dock(){
  if (docked == true){
    docked = false;
  } else {
    docked = true;
  }
}

// Animation 

function animate(){
    requestAnimationFrame(animate); 
    if (kawabot){
        let initialYPosition = kawabot.position.y;

        const hoverAmplitude = 0.0006;
        const hoverFrequency = 0.005;
        const hoverOffSet = Math.sin(Date.now() * hoverFrequency) * hoverAmplitude;
        kawabot.position.y = initialYPosition + hoverOffSet;

        if (movement) {
            // Movement module
            const distMultiplier = 0.8;
            const speedMultiplier = 0.005;

            const targetX = cursorPosition.x * distMultiplier;
            const targetY = cursorPosition.y * distMultiplier;

            kawabot.position.x += (targetX - kawabot.position.x) * speedMultiplier;
            kawabot.position.y += (targetY - kawabot.position.y) * speedMultiplier;

            // Rotation module
            const deltaX = targetX - kawabot.position.x; // Calculate the angle between the robot and the cursor
            const deltaY = targetY - kawabot.position.y;
            const angle = Math.atan2(deltaY, deltaX);

            // Set the rotation of the robot to face the cursor
            kawabot.rotation.y = angle + Math.PI / 2; 
        }
        if (docked) {
          kawabot.rotation.y = Math.PI * 1.8;
        }
        //console.log("Cursor position:", cursorPosition.x, cursorPosition.y);
        //console.log("Kawabot position:", kawabot.position.x, kawabot.position.y, kawabot.position.z);
    }
    renderer.render(scene, camera);
}
animate();