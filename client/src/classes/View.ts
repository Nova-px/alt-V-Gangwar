import WebView from "./WebView";

export default class View {
    static all: View[] = [];

    name: string;
    visible: boolean;

    constructor(name: string) {
        this.name = name;
        this.visible = false;

        View.all.push(this);
    }

    on(eventName: string, listener: (...args: any[]) => void) {
        WebView.webView.on(`${this.name}::${eventName}`, listener.bind(this));
    }

    off(eventName: string, listener: (...args: any[]) => void) {
        WebView.webView.off(`${this.name}::${eventName}`, listener.bind(this));
    }

    emit(eventName: string, ...args: any[]) {
        WebView.webView.emit(`${this.name}::${eventName}`, ...args);
    }

    onOpen() {}
    onClose() {}

    static getByName(name: string) {
        return View.all.find(x => x.name == name);
    } 
}