import React from 'react';
import { useMemo, useState, useRef, useEffect, Suspense } from 'react';
import { insertCoin, onPlayerJoin } from 'playroomkit';
import { useStore } from "./components/store";
import {settings, player , update_player_pos} from "./player.js";
import { Loader } from '@react-three/drei';

const ThreeScene = () => {
  const mountRef = useRef(null);

  const { actions } = useStore();
  const start = async () => {
    await insertCoin({skip_lobby: true});

    onPlayerJoin((state) => {
      actions.add_player(state);
      actions.set_id(state.id);
      state.onQuit(() => {
        actions.remove_player(state);
      });
    });
  }
  //setup login session

  const [keysPressed, setKeysPressed] = useState({ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

  useEffect(() => {
    start();
    settings.renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(settings.renderer.domElement);
    //set rendering size

    const animate_loop = () => {
      requestAnimationFrame(animate_loop);
      if (player.mixer) {
        player.mixer.update(settings.clock.getDelta());
      }
      update_player_pos(keysPressed, player, settings);
      //console.log('touche appuer:' + keysPressed['ArrowUp']);
      settings.renderer.render(settings.scene, settings.camera);
    };
    animate_loop();
    //load animation

    const handleKeyDown = (event) => {
      setKeysPressed((prevState) => ({ ...prevState, [event.key]: true }));
      console.log(event.key + '= j ai appuyé');
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevState) => ({ ...prevState, [event.key]: false }));
      console.log(event.key + '= j ai pas appuyé');
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

  return (
    <>
    <Loader />
    <div ref={mountRef}></div>;
    </>
  )
};

export default ThreeScene;
