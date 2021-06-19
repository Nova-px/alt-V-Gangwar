/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
import alt from 'alt-server';
import BanController from './BanController';

class EventController {
    constructor() {}

    onClient(eventName: string, listener: (player: alt.Player, ...args: any[]) => void, needAccount: boolean | null = true) {
        alt.onClient(eventName, (player, ...args) => {
            const haveAccount = player.account != undefined;

            if(needAccount == null) return listener(player, ...args);

            if(haveAccount == needAccount) listener(player, ...args);
            else this.kick(player, eventName, needAccount);
        });
    }

    async kick(player: alt.Player, eventName: string, needAccount: boolean) {
        await BanController.ban(player, `Blocked event: ${eventName} - ${needAccount}`, 0, 0);
        player.kick("Du wurdest vom Anticheat gesperrt! Bitte finde dich im Support ein.");
    }
}

export default new EventController();