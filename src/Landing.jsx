import React, { useEffect, useRef, useState } from "react";
import { useStore } from "./components/store";
import App from './App';
import gsap from "gsap";

export const Landing = () => {
    const { game_started, actions } = useStore();

    const logo = useRef();
    const start_button = useRef();
    const home_ref = useRef();
    const [setup_status, set_setups_status] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();

        if (setup_status === 0) {
            if (logo.current && start_button.current) {
                tl.from(logo.current, {
                    scale: 122,
                    opacity: 0,
                    duration: 0,
                    ease: "power4.out",
                })
                    .to(logo.current, {
                      scale: 1,
                      opacity: 1,
                      duration: 1.5,
                      ease: "power4.out",
                    })
                    .to(start_button.current, {
                      opacity: 1,
                      duration: 3,
                      delay: 1,
                      ease: "power4.out",
                    });
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
              set_setups_status(1);
            }
          };

          document.body.addEventListener('keydown', handleKeyDown);
          return () => {
            document.body.removeEventListener('keydown', handleKeyDown);
          };
        }, [setup_status]);

        if (game_started) {
          return (
            <>
            <App />
            </>
          );
        }

        if (setup_status === 1) {
            return null;
        }

        return (
            <>
                {setup_status === 0 && (
                    <div className="home" ref={home_ref}>
                        <h1
                            size={100}
                            >SLAYER.JS</h1>
                        <div className="logo">
                            <img ref={logo} src="./wallpaper.png" alt="logo" />
                        </div>
                        <div className="start" ref={start_button}>
                            <button className="start-button"
                                onClick={() => {
                                    set_setups_status(1);
                                    actions.set_game_started(true);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        set_setups_status(1);
                                    }}} autoFocus>
                            PRESS ENTER TO START
                            </button>
                        </div>
                    </div>
                )}
            </>
        );
};