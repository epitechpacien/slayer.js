import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {settings} from "./init.js";

const rengoku_loader = new GLTFLoader();
let rengoku_model;
let mixer;
let rengoku_clips;
let wave_clip;
let action;

let scene = settings.scene;
rengoku_loader.load('animations/rengoku.glb', function (gltf) {
    rengoku_model = gltf.scene;
    rengoku_model.scale.set(0.3, 0.3, 0.3)
    rengoku_model.position.set(0, 0.6, 1);
    rengoku_model.rotation.y = Math.PI;
    scene.add(rengoku_model);
    mixer = new THREE.AnimationMixer(rengoku_model);
    rengoku_clips = gltf.animations;
    wave_clip = THREE.AnimationClip.findByName(rengoku_clips, 'ninja_run');
    action = mixer.clipAction(wave_clip);
    action.play();
    }, undefined, function (error) {
        console.error('An error occured while loading the model', error);
    }
);
settings.scene = scene;

loop()

function loop() {
    requestAnimationFrame(loop);
    mixer.update((settings.clock).getDelta());
    settings.renderer.render(settings.scene, settings.camera);
}
