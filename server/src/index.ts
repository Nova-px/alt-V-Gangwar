/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
 */
import alt from 'alt-server';
import Account from './classes/Account';

alt.on("playerConnect", (player) => {
    player.model = alt.hash("mp_m_freemode_01");
    player.spawn(0, 0, 73, 0);
});

declare module "alt-server" {
    export interface Player {
        account?: Account;
    }
}