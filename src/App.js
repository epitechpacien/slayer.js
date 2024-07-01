import ThreeScene from "./load_app";
//loop()

/*function loop() {
    requestAnimationFrame(loop);
    player.mixer.update((settings.clock).getDelta());
    update_player_pos(player, settings);
    settings.renderer.render(settings.scene, settings.camera);
}*/


function App() {
  return (
    <div className="App">
      <ThreeScene />
    </div>
  );
};

export default App;
