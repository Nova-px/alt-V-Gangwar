import alt from 'alt-client';
import Controller from '../classes/Controller';

class EventController extends Controller {
    constructor() {
        super("Event");
    }

    onServer(eventName: string, listener: (...args: any[]) => void) {
        if(alt.isInDebug()) alt.log(`Event >> Listening on ${eventName}`);
        alt.onServer(eventName, (eventName: string, ...args: any[]) => listener(eventName, ...args));
    }

    emitServer(eventName: string, ...args: any[]) {
        if(alt.isInDebug()) alt.log(`Event >> Sending to server: ${eventName} - ${JSON.stringify(args)}`);
        alt.emitServer(eventName, ...args);
    }
}

export default new EventController();