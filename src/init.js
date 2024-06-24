import * as THREE from 'three';

class scene_settings {
    constructor() {
        this.scene;
        this.camera;
        this.renderer;
        this.light;
        this.clock;
        this.x;
        this.y;
        this.z;
    }
}
/*initialisation of settings class*/

let settings = new scene_settings();
settings.scene = new THREE.Scene();
settings.camera = new THREE.PerspectiveCamera(70, iw/ih);
settings.renderer = new THREE.WebGLRenderer({canvas});
settings.light = new THREE.PointLight(0xffffe6);
settings.clock = new THREE.Clock();
settings.x = 0;
settings.y = 2;
settings.z = 4;

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