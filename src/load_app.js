// src/ThreeScene.js
import React from 'react';
import { useRef, useEffect } from 'react';
import {settings, player, update_player_pos} from "./player.js";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    settings.renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(settings.renderer.domElement);
    //set rendering size

    const animate_loop = () => {
      requestAnimationFrame(animate_loop);
      if (player.mixer) {
        player.mixer.update(settings.clock.getDelta());
      }
      update_player_pos(player, settings);
      settings.renderer.render(settings.scene, settings.camera);
    };
    animate_loop();
    //load animation

    return () => {
      mountRef.current.removeChild(settings.renderer.domElement);
    };
    //free mountref component
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
