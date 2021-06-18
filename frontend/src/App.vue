<template>
    <v-app dark>
        <v-main>
            <HUD v-if="showHUD" />

            <component v-for="(window, i) in windows" :key="i" style="position: absolute;" :is="window.name" :data="window.data" :mounted="onOpen(window.name)" />
        </v-main>
    </v-app>
</template>

<script>
import Login from './views/Login.vue';
import HUD from './views/HUD.vue';

export default {
    components: {
        Login,
        HUD
    },

    data() {
        return {
            windows: [],
            showHUD: false
        }
    },

    methods: {
        onOpen(name) {
            this.$alt.emit("Window::onOpen", name);
        }
    },

    mounted() {
        this.$alt.on("Window::show", (name, args) => {
            this.windows.push({ name, data: { ...args } });
        });

        this.$alt.on("Window::close", name => {
            if(!this.windows.some(x => x.name === name)) return;

            this.windows.slice(this.windows.findIndex(x => x.name === name), 1);
        });

        this.$alt.on("Notify", (type, text) => this.$toast(text, { type }));
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