import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import { Joystick } from "react-joystick-component";

export const HUD = () => {
    const [image, set_image] = useState("");
    const { game_started, actions, controls } = useStore();

    const handleMove = (e) => {
        actions.setJoystickX(e.x);
    };

    const handleStop = () => {
        actions.setJoystickX(0);
    };

    return (
        <div className="overlay">
            {game_started && (
                <>
                    {controls === "touch" && (
                        <>
                        <div className="controls joystick">
                        <Joystick
                            size={100}
                            sticky={false}
                            baseColor="rgba(255, 255, 255, 0.5)"
                            stickColor="rgba(255, 255, 255, 0.5)"
                            move={handleMove}
                            stop={handleStop}
                            ></Joystick>
                        </div>
                        <div
                            className="controls menu_button"
                            onMouseDown={(e) => {
                                actions.set_menu_button(true);
                            }}
                            onMouseUp={(e) => {
                                actions.set_menu_button(false);
                            }}
                            onTouchStart={(e) => {
                                e.preventDefault();
                                actions.set_menu_button(true);
                            }}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                actions.setMenuButton(false);
                            }}
                        >
                            menu
                        </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};