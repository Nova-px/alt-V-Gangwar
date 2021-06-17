/// <reference types='@altv/types-webview'/>
import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $alt: Alt;
    }

    interface VueConstructor {
        $alt: Alt;
    }
}

const install = (vue: typeof Vue) => {
    vue.prototype.$alt = {
        emit(eventName: string, ...args: any[]) {
            // @ts-ignore
            if("alt" in window) alt.emit(eventName, ...args);
            else console.log(`[ALT]::[EMIT] - ${eventName} - ${args.join(" | ")}`);
        },
        off(eventName: string, listener: (...args: any[]) => void) {
            if("alt" in window) alt.off(eventName, listener);
            else console.log(`[ALT]::[OFF] - ${eventName}`);
        },
        on(eventName: string, listener: (...args: any[]) => void) {
            if("alt" in window) alt.on(eventName, listener);
            else console.log(`[ALT]::[ON] - ${eventName}`);
        }
    };
}

Vue.use(install);