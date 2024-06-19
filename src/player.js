import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {settings} from "./init.js";

 class player_info {
    constructor () {
        this.model;
        this.mixer;
        this.run_clip;
        this.jump_clip;
        this.dash_clip;
        this.action;
    }
 }

/*create player class with all info*/

let player = new player_info();
const rengoku_loader = new GLTFLoader();
let rengoku_clips;

rengoku_loader.load('animations/rengoku.glb', function (gltf) {
    player.model = gltf.scene;
    player.model.scale.set(0.3, 0.3, 0.3)
    player.model.position.set(0, 0.6, 1);
    player.model.rotation.y = Math.PI;
    settings.scene.add(player.model);
    player.mixer = new THREE.AnimationMixer(player.model);
    rengoku_clips = gltf.animations;
    player.run_clip = THREE.AnimationClip.findByName(rengoku_clips, 'ninja_run');
    player.jump_clip = THREE.AnimationClip.findByName(rengoku_clips, 'jump');
    player.dash_clip = THREE.AnimationClip.findByName(rengoku_clips, 'dash');
    player.action = player.mixer.clipAction(player.run_clip);
    player.action.play();
    }, undefined, function (error) {
        console.error('An error occured while loading the model', error);
    }
);

/*load player model with postion, scale, rotation and run clip*/

export {settings, player};