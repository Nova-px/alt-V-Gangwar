<template>
    <v-app dark>
        <v-main>
            <component v-for="(window, i) in windows" :key="i" style="position: absolute;" :is="window.name" :data="window.data" :mounted="onOpen(window.name)" v-on:showWindow="showWindow" v-on:closeWindow="closeWindow" />
        </v-main>
    </v-app>
</template>

<script>
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import HUD from './views/HUD.vue';

export default {
    components: {
        Login,
        Register,
        HUD
    },

    data() {
        return {
            windows: []
        }
    },

    methods: {
        onOpen(name) {
            this.$alt.emit("Window::onOpen", name);
        },
        showWindow(name, args) {
            if(this.windows.some(x => x.name === name)) return;
            this.windows.push({ name: name, data: { ...args } });
        },
        closeWindow(name) {
            if(!this.windows.some(x => x.name === name)) return;

            this.windows = this.windows.filter(x => x.name != name);
            this.$alt.emit("Window::onClose", name);
        }
    },

    mounted() {
        this.$alt.on("Window::show", this.showWindow);
        this.$alt.on("Window::close", this.closeWindow);
        this.$alt.on("Notify", (data) => this.$toast(data.text, { type: data.type }));

        if(!("alt" in window)) {
            window.dev = {};
            
            window.dev.showWindow = this.showWindow;
            window.dev.closeWindow = this.closeWindow;
        }
    }
}
</script>
<style>
html {
    overflow-y: hidden !important;
    user-select: none;
}

* {
    user-select: none;
}

.theme--dark.v-application {
    background: transparent !important;
}

.animated {
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    
    animation: slide 0.5s forwards;
    animation-delay: 2s;
}

@-webkit-keyframes slide {
    100% {
        left: 0;
    }
}

@keyframes slide {
    100% {
        left: 0;
    }
}
</style>