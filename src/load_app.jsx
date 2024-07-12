import React from 'react';
import { useMemo, useRef, useEffect, Suspense } from 'react';
import { insertCoin, onPlayerJoin } from 'playroomkit';
import { useStore } from "./components/store";
import {settings, player } from "./player.js";
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
      settings.renderer.render(settings.scene, settings.camera);
    };
    animate_loop();
    //load animation

    return () => {
      mountRef.current.removeChild(settings.renderer.domElement);
    };
    //free mountref component
  },);

  return (
    <>
    <Loader />
    <div ref={mountRef}></div>;
    </>
  )
};

export default ThreeScene;
