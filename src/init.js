import * as THREE from 'three';

class scene_settings {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera= new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
        this.renderer =  new THREE.WebGLRenderer();
        this.light = new THREE.PointLight(0xffffe6);
        this.clock = new THREE.Clock();
        this.x = 0;
        this.y = 2;
        this.z = 4;
    };
}
/*initialisation of settings class*/

let settings = new scene_settings();

settings.camera.position.set(settings.x, settings.y, settings.z);
settings.light.position.set(0.2, 1.5,0.5);
settings.scene.background = new THREE.Color(0xC0D9E2);
settings.scene.add(settings.light);
/*fill settings variable with info*/

function init_plateau(settings) {
    const plateau_geo = new THREE.BoxGeometry(30, 0.1, 30);
    const plateau_material = new THREE.MeshPhongMaterial( {color: 0xb8b894} );
    const mesh_plateau = new THREE.Mesh(plateau_geo, plateau_material);

    mesh_plateau.position.set(0, 0.5, -0.1);
    mesh_plateau.rotation.x += 0;
    settings.scene.add(mesh_plateau);
}
/*set the plateau with black color*/

init_plateau(settings);

export {settings};
