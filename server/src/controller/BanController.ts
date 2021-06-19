/**
 * @license

 * OPEN SOURCE GANGWAR PROJECT 
 * (C) 2021 Nova
 * By downloading you agree that you never will sell this project/files.
*/
import alt from 'alt-server';
import moment from 'moment';
import Account from '../classes/Account';
import IBan from '../interfaces/IBan';
import DatabaseController from './DatabaseController';
import EventController from './EventController';

class BanController {
    constructor() {
        EventController.onClient("Ban::Self", this.onBanSelf.bind(this), null);
    }

    async onBanSelf(player: alt.Player, reason: string, minutes: number) {
        await this.ban(player, reason, 0, minutes || 0);
        player.kick(`Du wurdest gesperrt! Grund: ${reason}`);
    }

    async ban(player: alt.Player, reason: string, adminId: number, minutes: number) {
        const targetId = player.account != null ? player.account.id : 0;

        let expireDate = moment(Date.now()).add(minutes, "m").toDate();
        if(minutes == 0) expireDate = moment(Date.now()).add(5, "y").toDate();

        await DatabaseController.query("INSERT INTO bans (accountId, hwid, hwidEx, socialId, reason, adminId, expireDate) VALUES(?, ?, ?, ?, ?, ?, ?)", [
            targetId,
            player.hwidHash,
            player.hwidExHash,
            player.socialId,
            reason,
            adminId,
            expireDate
        ]);
    }

    async checkPlayer(player: alt.Player) {
        const res = await DatabaseController.query("SELECT * FROM bans WHERE hwid = ? OR hwidEx = ? OR socialId = ?", [player.hwidHash, player.hwidExHash, player.socialId]);
        if(res != null && res[0]) {
            const banData: IBan = res[0];

            const duration = moment.duration(moment(banData.expireDate).diff(moment(new Date()))).asSeconds();
            if(duration > 0) {
                if(!player.hwidHash.includes(banData.hwid) || !player.hwidExHash.includes(banData.hwidEx) || !player.socialId.includes(banData.socialId))
                    await this.ban(player, "Doppelaccounting", 0, 0);

                return true;
            }

            return false;
        } else return false;
    }

    async checkByAccountId(id: number) {
        const res = await DatabaseController.query("SELECT * FROM bans WHERE accountId = ?", [id]);
        if(res != null && res[0]) {
            const banData: IBan = res[0];

            const duration = moment.duration(moment(banData.expireDate).diff(moment(new Date()))).asSeconds();
            if(duration > 0) return true;

            return false;
        } else return false;
    }
}

export default new BanController();