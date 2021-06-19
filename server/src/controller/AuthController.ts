/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
import alt from 'alt-server';
import bcrypt from 'bcryptjs';
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
        console.log(res);

        if(res != null) {
            const account: IDatabaseAccount = res[0];

            if(await bcrypt.compare(password, account.password)) {
                player.account = new Account(account);

                // TODO: login and character creation
                if(account.character == "{}") {
                    alt.emit('character:Edit', player);
                } else {
                    alt.emit('character:Sync', player, player.account.character);
                }
            } else return alt.emitClient(player, "Login::Response", "Das angegebene Passwort ist inkorrekt!");
        } else return alt.emitClient(player, "Login::Response", "Es existiert kein Benutzer mit diesem Benutzername!");
    }
}

export default new AuthController();