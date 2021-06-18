import alt from 'alt-client';

export default class Controller {
    static all: Controller[] = [];
    name: string;

    constructor(name: string) {
        this.name = name;
        if(Controller.all.some(x => x.name == name)) {
            alt.log(`Controller >> ${name} already exists!`);
            return;
        }
        
        alt.log(`Controller >> ${name} loaded...`);
        alt.everyTick(this.onTick.bind(this));

        alt.on("keydown", key => this.onKey(key, true));
        alt.on("keyup", key => this.onKey(key, false));
        alt.on("consoleCommand", (command: string, ...args: string[]) => this.onConsoleCommand(command, ...args));

        Controller.all.push(this);
    }

    static getByName(name: string) {
        return Controller.all.find(x => x.name == name);
    }

    getByName(name: string) {
        return Controller.all.find(x => x.name == name);
    }

    onTick() {}
    onConsoleCommand(command: string, ...args: string[]) {}
    onKey(key: number, down: boolean) {}
}