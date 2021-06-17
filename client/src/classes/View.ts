import alt from 'alt-client';
import game from 'natives';

export default class View {
    static all: View[] = [];

    name: string;
    visible: boolean;

    constructor(name: string) {
        this.name = name;
        this.visible = false;

        View.all.push(this);
    }

    static getByName(name: string) {
        return View.all.find(x => x.name == name);
    } 
}