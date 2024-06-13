import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class scene_settings {
    constructor() {
        this.scene;
        this.camera;
        this.renderer;
        this.light;
        this.clock;
    }
}

let settings = new scene_settings();
settings.scene = new THREE.Scene();
settings.camera = new THREE.PerspectiveCamera(70, iw/ih);
settings.renderer = new THREE.WebGLRenderer({canvas});
settings.light = new THREE.PointLight(0xffffe6);
settings.clock = new THREE.Clock();

settings.camera.position.set(0, 2, 4);
settings.light.position.set(0.2, 1.5,0.5);
settings.scene.background = new THREE.Color(0xC0D9E2);
settings.scene.add(settings.light);

export {settings};