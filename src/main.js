import {settings} from "./init.js";
import {init_player} from "./player.js";

init_player(settings);

loop()

function loop() {
    requestAnimationFrame(loop);
    //(settings.mixer).update((settings.clock).getDelta());
    settings.renderer.render(settings.scene, settings.camera);
}

/*start game loop*/
