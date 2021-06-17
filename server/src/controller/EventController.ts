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
            if(needAccount) {
                if(player.account) listener(player, ...args);
                else {
                    // TODO: ban player because invalid event

                    player.kick("Du wurdest vom Anticheat gebannt! Bitte finde dich im Support ein.");
                }
            } else listener(player, ...args);
        });
    }
}

export default new EventController();