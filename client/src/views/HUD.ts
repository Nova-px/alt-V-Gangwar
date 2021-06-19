import alt from 'alt-client';

import View from '../classes/View';
import EventController from '../controller/EventController';

class HUDView extends View {
    constructor() {
        super("HUD");

        EventController.onServer("HUD::Update", this.onUpdate.bind(this));
    }

    onUpdate(kills: number, deaths: number, level: number, xp: number, maxXP: number) {
        this.emit("Update", kills, deaths, level, xp, maxXP);
    }
}

export default new HUDView();