import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import React from 'react';
import { useRef, useEffect } from 'react';
import {settings} from "./init.js";

 class player_info {
    constructor () {
        this.model = null;
        this.mixer = null;
        this.idle_clip = null;
        this.run_clip = null;
        this.jump_clip = null;
        this.dash_clip = null;
        this.action = null;
        this.x = 0;
        this.y = 0.6;
        this.z = 1;
        this.keys = {};
    };
 }
/*create player class with all info*/

let player = new player_info();
const rengoku_loader = new GLTFLoader();
let rengoku_clips;

rengoku_loader.load('./models/characters/rengoku.glb', function (gltf) {
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

function update_player_pos(player, settings)
{
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            player.x -= 0.0005;
            settings.x -= 0.0005;
        }
        if (event.key === 'ArrowRight') {
            player.x += 0.0005;
            settings.x += 0.0005
        }
        if (event.key === 'ArrowUp') {
            player.z -= 0.0005;
            settings.z -= 0.0005;
        }
        if (event.key === 'ArrowDown') {
            player.z += 0.0005;
            settings.z += 0.0005;
        }
        player.action = player.mixer.clipAction(player.run_clip);
        player.action.play();
        player.model.position.set(player.x, player.y, player.z);
        settings.camera.position.set(settings.x, settings.y, settings.z);
    })
    /*useEffect(() => {
        const handleKeyDown = (event) => {
            player.keys[event.key] = true;
        };
        const handleKeyUp = (event) => {
            player.keys[event.key] = false;
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const updatePlayer = () => {
            if (player.keys['ArrowUp']) {
                player.z -= 0.0005;
            }
            if (player.keys['ArrowDown']) {
                player.z += 0.0005;
            }
            if (player.keys['ArrowLeft']) {
                player.x -= 0.0005;
            }
            if (player.keys['ArrowRight']) {
                player.x += 0.0005;
            }
        }
    })
    player.action = player.mixer.clipAction(player.run_clip);
    player.action.play();
    player.model.position.set(player.x, player.y, player.z);*/
};

export {settings, player, update_player_pos};