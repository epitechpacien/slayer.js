import {settings, player} from "./player.js";

loop()

function loop() {
    requestAnimationFrame(loop);
    player.mixer.update((settings.clock).getDelta());
    settings.renderer.render(settings.scene, settings.camera);
}

/*start game loop*/
