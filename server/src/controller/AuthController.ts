/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
import alt from 'alt-server';
import argon2 from 'argon2';

import EventController from './EventController';

class AuthController {
    constructor() {
        EventController.onClient("Auth::Login", this.onLogin.bind(this), false);
    }

    onLogin(player: alt.Player, username: string, password: string) {
        if(player.account) return;
    }
}

export default new AuthController();