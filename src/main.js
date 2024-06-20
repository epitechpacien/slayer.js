import {settings, player, update_player_pos} from "./player.js";

loop()

function loop() {
    requestAnimationFrame(loop);
    player.mixer.update((settings.clock).getDelta());
    update_player_pos(player, settings);
    settings.renderer.render(settings.scene, settings.camera);
}

/*start game loop*/
