import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {settings} from "./init.js";

 class player_info {
    constructor () {
        this.model;
        this.mixer;
        this.idle_clip;
        this.run_clip;
        this.jump_clip;
        this.dash_clip;
        this.action;
        this.x;
        this.y;
        this.z;
    }
 }

/*create player class with all info*/

let player = new player_info();
player.x = 0;
player.y = 0.6;
player.z = 1;
const rengoku_loader = new GLTFLoader();
let rengoku_clips;

rengoku_loader.load('animations/rengoku.glb', function (gltf) {
    player.model = gltf.scene;
    player.model.scale.set(0.3, 0.3, 0.3)
    player.model.position.set(player.x, player.y, player.z);
    player.model.rotation.y = Math.PI;
    settings.scene.add(player.model);
    player.mixer = new THREE.AnimationMixer(player.model);
    rengoku_clips = gltf.animations;
    player.idle_clip = THREE.AnimationClip.findByName(rengoku_clips, 'idle');
    player.run_clip = THREE.AnimationClip.findByName(rengoku_clips, 'ninja_run');
    player.jump_clip = THREE.AnimationClip.findByName(rengoku_clips, 'jump');
    player.dash_clip = THREE.AnimationClip.findByName(rengoku_clips, 'dash');
    player.action = player.mixer.clipAction();
    player.action.play();
    }, undefined, function (error) {
        console.error('An error occured while loading the model', error);
    }
);

/*load player model with postion, scale, rotation and run clip*/

export {settings, player};