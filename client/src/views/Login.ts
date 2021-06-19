import alt from 'alt-client';

import View from '../classes/View';
import ControlsController from '../controller/ControlsController';
import EventController from '../controller/EventController';

class LoginView extends View {
    constructor() {
        super("Login");

        this.on("Auth", this.onAuth.bind(this));

        EventController.onServer("Login::SaveUsername", this.onSaveUsername.bind(this));
        EventController.onServer("Login::Response", this.onResponse.bind(this));
    }

    onOpen() {
        ControlsController.showCursor(true);
        ControlsController.toggleGameControls(false);

        if(alt.LocalStorage.get().get("Username")) this.emit("SetUsername", alt.LocalStorage.get().get("Username"));
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

    onSaveUsername(username: string) {
        alt.LocalStorage.get().set("Username", username);
        alt.LocalStorage.get().save();
    }
}

export default new LoginView();