import alt from 'alt-client';

import View from '../classes/View';
import ControlsController from '../controller/ControlsController';
import EventController from '../controller/EventController';

class LoginView extends View {
    constructor() {
        super("Login");

        this.on("Auth", this.onAuth.bind(this));
        EventController.onServer("Login::Response", this.onResponse.bind(this));
    }

    onOpen() {
        ControlsController.showCursor(true);
        ControlsController.toggleGameControls(false);
    }

    onClose() {
        ControlsController.showCursor(false);
        ControlsController.toggleGameControls(true);
    }

    onAuth(username: string, password: string) {
        EventController.emitServer("Auth::Login", username, password);
    }

    onResponse(text: string) {
        this.emit("Response", text);
    }
}

export default new LoginView();