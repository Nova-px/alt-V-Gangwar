import alt from 'alt-client';
import View from './View';

class WebView {
    webView: alt.WebView;

    constructor() {
        this.webView = new alt.WebView("http://localhost:8080/", true);
        this.webView.on("load", () => {
            this.webView.focus();
        });

        this.webView.on("Window::onOpen", this.onOpen.bind(this));
    }

    showWindow(name: string, args: {}) {
        this.webView.emit("Window::show", name, args);
    }

    closeWindow(name: string) {
        this.webView.emit("Window::close", name);

        const view = View.getByName(name);
        if(view) view.visible = false;
    }

    onOpen(name: string) {
        const view = View.getByName(name);
        if(view) view.visible = true;
    }
}

export default new WebView();