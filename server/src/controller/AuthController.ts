/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
import alt from 'alt-server';
import bcrypt from 'bcryptjs';
import Account from '../classes/Account';
import IDatabaseAccount from '../interfaces/IAccount';
import DatabaseController from './DatabaseController';
import EventController from './EventController';

class AuthController {
    constructor() {
        EventController.onClient("Auth::Login", this.onLogin.bind(this), false);
        EventController.onClient("Auth::Register", this.onRegister.bind(this), false);
    }

    async onLogin(player: alt.Player, username: string, password: string) {
        if(player.account) return;
        if(username.length < 4) return alt.emitClient(player, "Login::Response", "Der Benutzername ist zu kurz. (Mindestens 4 Zeichen)");
        if(password.length < 6) return alt.emitClient(player, "Login::Response", "Das Passwort ist zu kurz. (Mindestens 6 Zeichen)");

        const res = await DatabaseController.query("SELECT * FROM accounts WHERE username = ?", [username]);
        if(res != null && res[0]) {
            const account: IDatabaseAccount = res[0];

            if(await bcrypt.compare(password, account.password)) {
                alt.emitClient(player, "Login::SaveUsername", username);
                alt.emitClient(player, "Window::close", "Login");
                
                player.account = new Account(account);

                if(account.characterData == "{}") alt.emit('character:Edit', player);
                else {
                    alt.emit('character:Sync', player, player.account.character);
                    alt.emitClient(player, "Window::show", "HUD", {
                        kills: player.account.kills,
                        deaths: player.account.kills,
                        level: player.account.level,
                        xp: player.account.xp,
                        maxXP: player.account.maxXP
                    });
                }
            } else return alt.emitClient(player, "Login::Response", "Das angegebene Passwort ist inkorrekt!");
        } else return alt.emitClient(player, "Login::Response", "Es existiert kein Benutzer mit diesem Benutzername!");
    }

    async onRegister(player: alt.Player, username: string, password: string, repeatPassword: string) {
        if(player.account) return;
        if(username.length < 4) return alt.emitClient(player, "Register::Response", "Der Benutzername ist zu kurz. (Mindestens 4 Zeichen)");
        if(password.length < 6) return alt.emitClient(player, "Register::Response", "Das Passwort ist zu kurz. (Mindestens 6 Zeichen)");
        if(repeatPassword.length < 6) return alt.emitClient(player, "Register::Response", "Das zweite Passwort ist zu kurz. (Mindestens 6 Zeichen)");
        if(password !== repeatPassword) return alt.emitClient(player, "Register::Response", "Die Passwörter sind nicht identisch!");

        const res = await DatabaseController.query("SELECT * FROM accounts WHERE username = ?", [username]);
        if(res != null && !res[0]) {
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
            
            await DatabaseController.query("INSERT INTO accounts(username, password) VALUES(?, ?)", [username, hashedPassword]);
            alt.emitClient(player, "Window::notify", { type: "success", text: "Du hast dir erfolgreich ein Benutzerkonto erstellt! Du kannst nicht nun anmelden." });

            alt.emitClient(player, "Register::Response");
            alt.emitClient(player, "Window::show", "Login", { username: username });
            alt.emitClient(player, "Window::close", "Register");
        } else return alt.emitClient(player, "Register::Response", "Es existiert bereits ein Benutzer mit diesem Benutzername!");
    }
}

export default new AuthController();