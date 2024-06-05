import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, iw/ih);
const renderer = new THREE.WebGLRenderer({canvas});
const light = new THREE.PointLight(0xffffe6);
const clock = new THREE.Clock();

const plateau_geo = new THREE.BoxGeometry(5, 0.1, 5);
const plateau_material = new THREE.MeshPhongMaterial( {color: 0xb8b894} );
const mesh_plateau = new THREE.Mesh(plateau_geo, plateau_material);

const rengoku_loader = new GLTFLoader();
let rengoku_model;
let mixer;
let rengoku_clips;
let wave_clip;
let action;
let rengoku_pos;

rengoku_loader.load('animations/wave.glb', function (gltf) {
    rengoku_model = gltf.scene;
    rengoku_model.scale.set(0.3, 0.3, 0.3)
    rengoku_model.position.set(0, 0.6, 1);
    rengoku_model.rotation.y = Math.PI;
    scene.add(rengoku_model);
    mixer = new THREE.AnimationMixer(rengoku_model);
    rengoku_clips = gltf.animations;
    wave_clip = THREE.AnimationClip.findByName(rengoku_clips, 'wave_action');
    action = mixer.clipAction(wave_clip);
    action.play();
    }, undefined, function (error) {
        console.error('An error occured while loading the model', error);
    }
);

camera.position.set(0, 2, 4);
light.position.set(0.2, 1.5,0.5);
scene.add(mesh_plateau);
scene.add(light);

scene.background = new THREE.Color(0xC0D9E2);
mesh_plateau.position.set(0, 0.5, -0.1);
mesh_plateau.rotation.x += 0.1;

loop()

function loop() {
    requestAnimationFrame(loop);
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}
