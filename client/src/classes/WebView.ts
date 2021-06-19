import alt from 'alt-client';

import EventController from '../controller/EventController';
import View from './View';

class WebView {
    webView: alt.WebView;

    constructor() {
        this.webView = new alt.WebView("http://localhost:8080/", true);
        this.webView.on("load", () => {
            this.webView.focus();
            EventController.emitServer("PlayerReady");
        });

        this.webView.on("Window::onOpen", this.onOpen.bind(this));
        this.webView.on("Window::onClose", this.onClose.bind(this));

        EventController.onServer("Window::show", this.showWindow.bind(this));
        EventController.onServer("Window::close", this.closeWindow.bind(this));
        EventController.onServer("Window::notify", this.notify.bind(this));
    }

    showWindow(name: string, args: {}) {
        this.webView.emit("Window::show", name, { ...args });
    }

    closeWindow(name: string) {
        this.webView.emit("Window::close", name);
    }

    notify(data: any) {
        this.webView.emit("Notify", data);
    }

    onOpen(name: string) {
        const view = View.getByName(name);
        if(view) {
            view.visible = true;
            view.onOpen();
        }
    }

    onClose(name: string) {
        const view = View.getByName(name);
        if(view) {
            view.visible = false;
            view.onClose();
        }
    }
}

export default new WebView();