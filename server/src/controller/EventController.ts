/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
import alt from 'alt-server';

class EventController {
    constructor() {}

    onClient(eventName: string, listener: (player: alt.Player, ...args: any[]) => void, needAccount: boolean = true) {
        alt.onClient(eventName, (player, ...args) => {
            const haveAccount = player.account != undefined;

            if(haveAccount == needAccount) listener(player, ...args);
            else this.kick(player);
        });
    }

    kick(player: alt.Player) {
        // TODO: ban player because blocked event

        player.kick("Du wurdest vom Anticheat gebannt! Bitte finde dich im Support ein.");
    }
}

export default new EventController();