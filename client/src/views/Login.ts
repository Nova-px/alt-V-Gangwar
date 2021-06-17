import alt from 'alt-client';
import game from 'natives';

import View from '../classes/View';

class LoginView extends View {
    constructor() {
        super("Login");
    }
}

export default new LoginView();