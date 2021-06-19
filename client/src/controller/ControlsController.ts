import alt from 'alt-client';
import Controller from '../classes/Controller';

class ControlsController extends Controller {
    public cursor: boolean;
    public gameControls: boolean;

    constructor() {
        super("Controls");

        this.cursor = false;
        this.gameControls = true;
    }

    showCursor(toggle: boolean) {
        if(this.cursor === toggle) return;

        this.cursor = toggle;
        alt.showCursor(this.cursor);
    }

    toggleGameControls(toggle: boolean) {
        if(this.gameControls === toggle) return;
        
        this.gameControls = toggle;
        alt.toggleGameControls(this.gameControls);
    }
}

export default new ControlsController();