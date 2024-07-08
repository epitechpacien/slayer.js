import { create } from "zustand";

  export const useStore = create((set, get) => ({
    game_started: false,
    controls: "",
    body_rotation: null,
    past_pos: [],
    should_slowdown: false,
    players: [],
    body: null,
    id: "",
    joystickX: 0,
    menu_button: false,
    add_past_pos: (pos) => {
        set((state) => ({
            past_pos: [pos, ...state.past_pos.slice(0, 499)],
        }));
    },
    actions: {
        set_body_pos: (pos) => {
            set({ body_pos: pos});
        },
        set_body_rotation: (rotation) => {
            set({ rotation });
        },
        get_body_pos: () => {
            return get().body_pos;
        },
        get_body_rotation: () => {
            return get().body_rotation;
        },
        set_should_slowDown: (should_slowdown) => {
            set({ should_slowdown });
        },
        get_should_slowDown: () => {
            return get().should_slowdown;
        },
        add_player : (player) => {
            set((state) => ({
              players: [...state.players, player],
            }));
        },
        remove_player : (player) => {
            set((state) => ({
              players: state.players.filter((p) => p.id !== player.id),
            }));
        },
        set_id : (id) => {
            set({id});
        },
        set_game_started: (game_started) => {
            set({ game_started });
        },
        set_controls: (controls) => {
            set({ controls });
        },
        set_joystickX: (joystickX) => {
            set({ joystickX });
        },
        set_menu_button: (menu_button) => {
            set({ menu_button });
        },
    },

  }));
