import React from 'react';
import { useMemo, useRef, useEffect, Suspense } from 'react';
import { insertCoin, onPlayerJoin } from 'playroomkit';
import { play_audio, useStore } from "./components/store";
import {settings, player, controls} from "./player.js";
import { Environment, KeyboardControls, Loader, OrbitControls, Preload, Stats } from '@react-three/drei';
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const map = useMemo(
    () => [
      { name: controls.up, keys: ['KeyZ', 'ArrowUp'] },
      { name: controls.down, keys: ['KeyS', 'ArrowDown'] },
      { name: controls.left, keys: ['KeyQ', 'ArrowLeft'] },
      { name: controls.right, keys: ['KeyD', 'ArrowRight'] },
      { name: controls.dash, keys: ['Shift'] },
      { name: controls.jump, keys: ['Space'] }
    ],
    []
  );

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
