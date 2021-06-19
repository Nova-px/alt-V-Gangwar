/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
import alt from 'alt-server';
import Account from './classes/Account';

import "./controller/AuthController";
import "./controller/EventController";
import "./controller/CharacterController";

import EventController from './controller/EventController';
import BanController from './controller/BanController';

EventController.onClient("PlayerReady", async player => {
    player.model = alt.hash("mp_m_freemode_01");
    player.spawn(0, 0, 73, 0);

    if(await BanController.checkPlayer(player)) {
        player.kick(`Du bist gesperrt! Bitte melde dich im Support.`);
        return;
    }

    alt.emitClient(player, "Window::show", "Login", {});
}, false);

declare module "alt-server" {
    export interface Player {
        account?: Account;
    }
}