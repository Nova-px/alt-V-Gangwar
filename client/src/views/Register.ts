import View from '../classes/View';
import ControlsController from '../controller/ControlsController';
import EventController from '../controller/EventController';

class RegisterView extends View {
    constructor() {
        super("Register");

        this.on("Auth", this.onAuth.bind(this));
        EventController.onServer("Register::Response", this.onResponse.bind(this));
    }

    onOpen() {
        ControlsController.showCursor(true);
        ControlsController.toggleGameControls(false);
    }

    onClose() {
        ControlsController.showCursor(false);
        ControlsController.toggleGameControls(true);
    }

    onAuth(username: string, password: string, repeatPassword: string) {
        EventController.emitServer("Auth::Register", username, password, repeatPassword);
    }

    onResponse(text: string) {
        this.emit("Response", text);
    }
}

export default new RegisterView();