import alt from 'alt-client';

class WebView {
    webView: alt.WebView;

    constructor() {
        this.webView = new alt.WebView("http://localhost:8080/", true);
        this.webView.on("load", () => this.webView.focus());


    }
}

export default new WebView();