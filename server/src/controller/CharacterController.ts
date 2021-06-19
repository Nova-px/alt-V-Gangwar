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

class CharacterController {
    constructor() {
        alt.on('character:Done', this.onEdited.bind(this));
    }

    async onEdited(player: alt.Player, data: any) {
        if(!player.account) return;

        alt.emit('character:Sync', player, data);
        player.pos = player.pos;
        
        await DatabaseController.query("UPDATE accounts SET characterData = ? WHERE id = ?", [JSON.stringify(data), player.account.id]);
    }
}

export default new CharacterController();