import "./classes/Controller";
import "./classes/View";
import "./classes/WebView";

import "./controller/ControlsController";
import "./controller/EventController";

import "./views/Login";
import "./views/Register";
import "./views/HUD";

import alt from 'alt-client';

alt.on("connectionComplete", () => {
    alt.setStat(alt.StatName.Stamina, 100);
    alt.setStat(alt.StatName.Strength, 100);
    alt.setStat(alt.StatName.LungCapacity, 100);
    alt.setStat(alt.StatName.Wheelie, 100);
    alt.setStat(alt.StatName.Flying, 100);
    alt.setStat(alt.StatName.Shooting, 100);
    alt.setStat(alt.StatName.Stealth, 100);
});