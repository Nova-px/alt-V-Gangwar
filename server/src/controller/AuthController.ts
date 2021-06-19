/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
import alt from 'alt-server';
import argon2 from 'argon2';
import Account from '../classes/Account';
import { IDatabaseAccount } from '../interfaces/IAccount';
import DatabaseController from './DatabaseController';

import EventController from './EventController';

class AuthController {
    constructor() {
        EventController.onClient("Auth::Login", this.onLogin.bind(this), false);
    }

    async onLogin(player: alt.Player, username: string, password: string) {
        if(player.account) return;
        if(username.length <= 4) return alt.emitClient(player, "Login::Response", "Der Benutzername ist zu kurz. (Mindestens 4 Zeichen)");
        if(password.length <= 6) return alt.emitClient(player, "Login::Response", "Das Passwort ist zu kurz. (Mindestens 6 Zeichen)");

        const res = await DatabaseController.query("SELECT * FROM accounts WHERE username = ?", [username]);
        if(res != null) {
            const account: IDatabaseAccount = res[0];

            if(await argon2.verify(account.password, password)) {
                player.account = new Account(account);
                
                // TODO: login and character creation
                
            } else return alt.emitClient(player, "Login::Response", "Das angegebene Passwort ist inkorrekt!");
        } else return alt.emitClient(player, "Login::Response", "Es existiert kein Benutzer mit diesem Benutzername!");
    }
}

export default new AuthController();