// src/ThreeScene.js
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {settings, player, update_player_pos} from "./player.js";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const [keysPressed, setKeysPressed] = useState({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

  useEffect(() => {
    settings.renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(settings.renderer.domElement);
    //set rendering size

    const animate_loop = () => {
      requestAnimationFrame(animate_loop);
      if (player.mixer) {
        player.mixer.update(settings.clock.getDelta());
      }
      update_player_pos(keysPressed, player);
      settings.renderer.render(settings.scene, settings.camera);
    };
    animate_loop();
    //load animation

    const handleKeyDown = (event) => {
      setKeysPressed((prevState) => ({ ...prevState, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevState) => ({ ...prevState, [event.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      mountRef.current.removeChild(settings.renderer.domElement);
    };
    //free mountref component
  }, [keysPressed]);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
